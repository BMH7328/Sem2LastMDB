const express = require("express");
const router = express.Router();

// import model into router
const Weapontype = require("../models/weapontype");

const isAdminMiddleware = require("../middleware/isAdmin");

router.get("/", async (req, res) => {
  try {
    res
      .status(200)
      .send(await Weapontype.find().populate("characters").populate("weapons"));
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.post("/", isAdminMiddleware, async (req, res) => {
  // create a placeholder for a new movie
  const newWeapon = new Weapontype({
    name: req.body.name,
    image: req.body.image,
    info: req.body.info,
  });
  // save the movie into mongodb
  await newWeapon.save();
  res.send(newWeapon);
});

router.delete("/:id", isAdminMiddleware, async (req, res) => {
  try {
    const weapontype_id = req.params.id;
    const deleteWea = await Weapontype.findByIdAndDelete(weapontype_id);
    res.status(200).send(deleteWea);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

module.exports = router;
