const express = require("express");
const router = express.Router();

const Weapon = require("../models/weapon");

const isAdminMiddleware = require("../middleware/isAdmin");

router.get("/", async (req, res) => {
  try {
    const { weapontype } = req.query;
    let filter = {};
    if (weapontype) {
      filter.weapontype = weapontype;
    }
    res
      .status(200)
      .send(await Weapon.find(filter).populate("weapontype").sort({ _id: -1 }));
  } catch (error) {
    res.status(400).send({ message: "Weapon Type not found" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Weapon.findOne({ _id: req.params.id });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ message: "Weapon id not found" });
  }
});

router.post("/", isAdminMiddleware, async (req, res) => {
  try {
    const newWeapon = new Weapon({
      name: req.body.name,
      quality: req.body.quality,
      weapontype: req.body.weapontype,
      release_date: req.body.release_date,
      image: req.body.image,
    });
    await newWeapon.save();
    res.status(200).send(newWeapon);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.put("/:id", isAdminMiddleware, async (req, res) => {
  try {
    const weapon_id = req.params.id;

    const updatedWeapon = await Weapon.findByIdAndUpdate(weapon_id, req.body, {
      new: true,
    });
    res.status(200).send(updatedWeapon);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.delete("/:id", isAdminMiddleware, async (req, res) => {
  try {
    const weapon_id = req.params.id;
    const deleteWea = await Weapon.findByIdAndDelete(weapon_id);
    res.status(200).send(deleteWea);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

module.exports = router;
