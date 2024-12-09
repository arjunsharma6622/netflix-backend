const mongoose = require("mongoose")

const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    img: { type: String },
    imgTitle: { type: String },
    imgSm: { type: String },
    trailer: { type: String, default: "https://res.cloudinary.com/dexnb3wk2/video/upload/v1733649395/netflix/woqkbepb8pkie2cq6pzb.mp4" },
    video: { type: String, default: "https://res.cloudinary.com/dexnb3wk2/video/upload/v1733649395/netflix/woqkbepb8pkie2cq6pzb.mp4" },
    duration : {type : String, required : true},
    year: { type: String },
    limit: { type: Number },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre', // Reference to the Genre schema
        required: true,
    },
    isSeries: { type: Boolean, default: false }
},
    { timestamps: true }
)


module.exports = mongoose.model("Movie", MovieSchema)