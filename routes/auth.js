const router = require("express").Router()
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const bcrypt = require("bcrypt")

dotenv.config()

//REGISTER
router.post("/register", async (req, res) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = new User({
        username : req.body.username ? req.body.username : "user",
        email : req.body.email,
        password : hashedPassword
    })

    try{
        const user = await newUser.save()
        res.status(200).json(user)
    }
    catch (err) {
        res.status(500).json(err)
    }

})

//LOGIN
router.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({email : req.body.email})

        if(!user) {
            res.status(401).json("Wrong password or username")
            return
        }

        console.log("checking pass")

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

        console.log("checking pass done")


        if(!isPasswordCorrect) {
            res.status(401).json("Wrong password or username")
            return
        }
        console.log("generating jwt")


        //creating a jwt TOKEN
        const accessToken = jwt.sign(
            {id : user._id, isAdmin : user.isAdmin},
            process.env.SECRET_KEY,
            {expiresIn : "5d"}
        )

        console.log("jwt done")

        //sending everthing except the password
        const {password, ...info} = user._doc

        res.status(200).json({...info, accessToken})
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;