const router = require("express").Router()
const List = require("../models/List")
const { verify, isAdmin } = require("../middlewares/auth")

//CREATE
router.post("/", verify, isAdmin, async (req, res) => {
    const newList = new List(req.body)
    try {
        const savedList = await newList.save()
        res.status(201).json(savedList)
    } catch (err) {
        res.status(500).json(err)
    }
})

//DELETE
router.delete("/:id", verify, isAdmin, async (req, res) => {
    const newList = new List(req.body)
    try {
        await List.findByIdAndDelete(req.params.id)
        res.status(201).json("The movie has been deleted")
    } catch (err) {
        res.status(500).json(err)
    }

}
)

//GET Lists
router.get("/", verify, async (req, res) => {
    const typeQuery = req.query.type
    const genreQuery = req.query.genre

    let list = [];
    try {
        if (typeQuery) {
            if (genreQuery) {
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery, genre: genreQuery } }
                ])
            }
            else {
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery } }
                ])
            }

        }
        else {
            list = await List.aggregate([{ $sample: { size: 10 } }])
        }

        res.status(200).json(list)
    }
    catch (err) {
        res.status(500).json(err)
    }

})

//GET one list
router.get("/:id", verify, isAdmin, async (req, res) => {
    const listId = req.params.id;
    try {
        const listData = await List.findById(listId);
        res.status(200).json(listData)
    }
    catch (error) {
        res.status(500).json(error);
    }
})


module.exports = router