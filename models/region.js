const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const regionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
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

const Region = model("Region", regionSchema);
module.exports = Region;
