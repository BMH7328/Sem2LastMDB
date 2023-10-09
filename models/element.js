const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const elementSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  archon: {
    type: String,
    required: true,
  },
  characters: [
    {
      type: Schema.Types.ObjectId,
      ref: "Character",
    },
  ],
});

const Element = model("Element", elementSchema);
module.exports = Element;
