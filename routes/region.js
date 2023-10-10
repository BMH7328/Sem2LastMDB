const express = require("express");
const router = express.Router();

// import model into router
const Region = require("../models/region");

const isAdminMiddleware = require("../middleware/isAdmin");

router.get("/", async (req, res) => {
  try {
    res.status(200).send(await Region.find().populate("characters"));
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.post("/", isAdminMiddleware, async (req, res) => {
  try {
    // create a placeholder for a new movie
    const newRegion = new Region({
      name: req.body.name,
      image: req.body.image,
    });
    // save the movie into mongodb
    await newRegion.save();
    res.status(200).send(newRegion);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.delete("/:id", isAdminMiddleware, async (req, res) => {
  try {
    const region_id = req.params.id;
    const deleteReg = await Region.findByIdAndDelete(region_id);
    res.status(200).send(deleteReg);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

module.exports = router;
