const express = require("express");
const router = express.Router();

// import model into router
const Element = require("../models/element");

const isAdminMiddleware = require("../middleware/isAdmin");

router.get("/", async (req, res) => {
  try {
    res.status(200).send(await Element.find().populate("characters"));
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.post("/", isAdminMiddleware, async (req, res) => {
  try {
    // create a placeholder for a new movie
    const newElement = new Element({
      name: req.body.name,
      image: req.body.image,
      archon: req.body.archon,
    });
    // save the movie into mongodb
    await newElement.save();
    res.status(200).send(newElement);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.delete("/:id", isAdminMiddleware, async (req, res) => {
  try {
    const element_id = req.params.id;
    const deleteEle = await Element.findByIdAndDelete(element_id);
    res.status(200).send(deleteEle);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

module.exports = router;
