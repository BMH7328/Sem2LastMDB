const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const Element = require("./element");
const Weapontype = require("./weapontype");
const Region = require("./region");

const characterSchema = new Schema({
  element: {
    type: Schema.Types.ObjectId,
    ref: "Element",
  },
  weapontype: {
    type: Schema.Types.ObjectId,
    ref: "Weapontype",
  },
  region: {
    type: Schema.Types.ObjectId,
    ref: "Region",
  },
  name: {
    type: String,
    required: true,
  },
  quality: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  release_date: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
});

// when the task is updated or created
characterSchema.post("save", async function () {
  // retrieve the current id that is updated
  const characterID = this._id;
  const elementID = this.element;
  // find the selected category
  const selectedElement = await Element.findById(elementID);
  // add the task into the selected category
  selectedElement.characters.push(characterID);
  // save the category
  await selectedElement.save();
});

characterSchema.post("save", async function () {
  // retrieve the current id that is updated
  const characterID = this._id;
  const weapontypeID = this.weapontype;
  // find the selected category
  const selectedWeapontype = await Weapontype.findById(weapontypeID);
  // add the task into the selected category
  selectedWeapontype.characters.push(characterID);
  // save the category
  await selectedWeapontype.save();
});

characterSchema.post("save", async function () {
  // retrieve the current id that is updated
  const characterID = this._id;
  const regionID = this.region;
  // find the selected category
  const selectedRegion = await Region.findById(regionID);
  // add the task into the selected category
  selectedRegion.characters.push(characterID);
  // save the category
  await selectedRegion.save();
});

const Character = model("Character", characterSchema);
module.exports = Character;
