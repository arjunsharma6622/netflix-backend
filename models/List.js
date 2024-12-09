const mongoose = require("mongoose")

const ListSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    type: { type: String, enum: ["movie", "series", "mixed"] }, // Optional: "mixed" for combined content
    content: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }], // References to a Movie schema
    genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Genre', // Reference to the Genre schema
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("List", ListSchema)