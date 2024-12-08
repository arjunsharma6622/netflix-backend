const router = require("express").Router()
const User = require("../models/User")
const cryptoJs = require("crypto-js")
const { verify, isAdmin } = require("../middlewares/auth")

//UPDATE USER
router.put("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            const hashedPassword = cryptoJs.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
            req.body.password = hashedPassword
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })
            res.status(200).json(updatedUser)
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
    else {
        res.status(403).json("You can update only your account")
    }


})

//DELETE USER
router.delete("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("The user has been deleted")
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
    else {
        res.status(403).json("You can delete only your account")
    }


})

//GET USER
router.get("/find/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...info } = user._doc
        res.status(200).json(info)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL USERS
router.get("/", verify, isAdmin, async (req, res) => {
    const query = req.query.new
    try {
        const users = query ? await User.find().sort({ _id: 1 }).limit(5) : await User.find()
        res.status(200).json(users)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router