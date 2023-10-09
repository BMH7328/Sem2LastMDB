const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const weapontypeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  info: {
    type: String,
    required: true,
  },

  characters: [
    {
      type: Schema.Types.ObjectId,
      ref: "Character",
    },
  ],

  weapons: [
    {
      type: Schema.Types.ObjectId,
      ref: "Weapon",
    },
  ],
});

const Weapontype = model("Weapontype", weapontypeSchema);
module.exports = Weapontype;
