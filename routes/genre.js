const router = require("express").Router();
const Genre = require("../models/Genre");
const { verify, isAdmin } = require("../middlewares/auth")

// CREATE
router.post("/", verify, isAdmin, async (req, res) => {
    const name = req.body.name;

    const newGenre = new Genre({ name: name });

    try {
        const savedGenre = await newGenre.save();
        res.status(201).json(savedGenre);
    } catch (error) {
        res.status(500).json(error);
    }
})

// GET ALL
router.get("/", verify, async (req, res) => {
    try {
        const genres = await Genre.find({});
        res.status(201).json(genres);
    }
    catch (error) {
        res.status(500).json(error);
    }
})

// DELETE GENRE
router.delete("/:id", verify, isAdmin, async (req, res) => {
    try{
        await Genre.findByIdAndDelete(req.params.id);
        res.status(201).json("The movies has been deleted")
    }
    catch(error){
        res.status(500).json(error);
    }
})

module.exports = router;