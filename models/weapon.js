const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const Weapontype = require("./weapontype");

const weaponSchema = new Schema({
  weapontype: {
    type: Schema.Types.ObjectId,
    ref: "Weapontype",
  },
  name: {
    type: String,
    required: true,
  },
  quality: {
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
});

// when the task is updated or created
weaponSchema.post("save", async function () {
  // retrieve the current id that is updated
  const weaponID = this._id;
  const weapontypeID = this.weapontype;
  // find the selected category
  const selectedWeapontype = await Weapontype.findById(weapontypeID);
  // add the task into the selected category
  selectedWeapontype.weapons.push(weaponID);
  // save the category
  await selectedWeapontype.save();
});

const Weapon = model("Weapon", weaponSchema);
module.exports = Weapon;
