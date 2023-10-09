const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const favoriteSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },

  userEmail: {
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

  date_add: {
    type: Date,
  },
});

const Favorite = model("Favorite", favoriteSchema);
module.exports = Favorite;
