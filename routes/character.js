const express = require("express");
const Element = require("../models/element");
const Region = require("../models/region");
const Weapontype = require("../models/weapontype");
const router = express.Router();

const Character = require("../models/character");

const isAdminMiddleware = require("../middleware/isAdmin");

router.get("/", async (req, res) => {
  try {
    const { element, region, weapontype } = req.query;
    let filter = {};
    if (element || region || weapontype) {
      if (element) {
        filter.element = element;
      }
      if (region) {
        filter.region = region;
      }
      if (weapontype) {
        filter.weapontype = weapontype;
      }
    }
    res
      .status(200)
      .send(
        await Character.find(filter)
          .populate("weapontype")
          .populate("element")
          .populate("region")
      );
  } catch (error) {
    res.status(400).send({ message: "Character not found" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Character.findOne({ _id: req.params.id })
      .populate("weapontype")
      .populate("element")
      .populate("region");
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ message: "Character id not found" });
  }
});

router.post("/", isAdminMiddleware, async (req, res) => {
  try {
    const newCharacter = new Character({
      name: req.body.name,
      region: req.body.region,
      element: req.body.element,
      weapontype: req.body.weapontype,
      quality: req.body.quality,
      birthday: req.body.birthday,
      release_date: req.body.release_date,
      image: req.body.image,
      detail: req.body.detail,
    });
    await newCharacter.save();
    res.status(200).send(newCharacter);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.put("/:id", isAdminMiddleware, async (req, res) => {
  try {
    const character_id = req.params.id;

    const updatedCharacter = await Character.findByIdAndUpdate(
      character_id,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );
    res.status(200).send(updatedCharacter);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.delete("/:id", isAdminMiddleware, async (req, res) => {
  try {
    const character_id = req.params.id;
    const deleteCha = await Character.findByIdAndDelete(character_id);
    res.status(200).send(deleteCha);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

module.exports = router;
