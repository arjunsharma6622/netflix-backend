const router = require("express").Router()
const Movie = require("../models/Movie")
const { verify, isAdmin } = require("../middlewares/auth")


//CREATE
router.post("/", verify, isAdmin, async (req, res) => {
    const newMovie = new Movie(req.body)
    try {
        const savedMovie = await newMovie.save()
        res.status(201).json(savedMovie)
    } catch (err) {
        res.status(500).json(err)
    }
})

//UPDATE
router.put("/:id", verify, isAdmin, async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        )
        res.status(200).json(updatedMovie)
    } catch (err) {
        res.status(500).json(err)
    }
})


//DELETE
router.delete("/:id", verify, isAdmin, async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id)
        res.status(200).json("The movie has been deleted")
    } catch (err) {
        res.status(500).json(err)
    }
})


//GET RANDOM
router.get("/random", async (req, res) => {
    const type = req.query.type
    let movie
    try {
        if (type === "series") {
            movie = await Movie.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size: 1 } }
            ])
        }
        else {
            movie = await Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 1 } }
            ])
        }

        res.status(200).json(movie)

    } catch (err) {
        res.status(500).json(err)
    }
})


//GET ALL MOVIES
router.get("/", async (req, res) => {
    try {
        const movies = await Movie.find()
        res.status(200).json(movies.reverse())
    }
    catch (err) {
        res.status(500).json(err)

    }
})

router.get("/find/:id", verify, async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id)
        res.status(200).json(movie)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router