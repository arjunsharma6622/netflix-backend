const mongoose = require("mongoose")

const ListSchema = new mongoose.Schema({
    title : {type: String, required: true, unique: true},
    type : {type: String},
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre', // Reference to the Genre schema
        required: true,
      },
    content : {type: Array}
},
{timestamps: true}
)


module.exports = mongoose.model("List", ListSchema)