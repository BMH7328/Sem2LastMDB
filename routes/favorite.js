const express = require("express");
const axios = require("axios");
const router = express.Router();

const Favorite = require("../models/favorite");

const authMiddleware = require("../middleware/auth");

router.get("/", authMiddleware, async (req, res) => {
  try {
    let filter = {};
    // only user will have this filter
    if (req.user && req.user.role === "user") {
      filter.userEmail = req.user.email;
    }

    res
      .status(200)
      .send(
        await Favorite.find(filter)
          .populate("characters")
          .populate("weapons")
          .sort({ _id: -1 })
      );
  } catch (error) {
    res.status(400).send({ message: "Favorite not found" });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const data = await Favorite.findOne({ _id: req.params.id });
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Favorite not found" });
  }
});

router.post("/", async (req, res) => {
  try {
    // create order in database
    const newFavorite = new Favorite({
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      characters: req.body.characters,
      weapons: req.body.weapons,
      date_add: new Date(),
    });

    await newFavorite.save();
    res.status(200).send(newFavorite);
  } catch (error) {
    res.status(400).send({
      message: error._message,
    });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const favorite_id = req.params.id;

    const deletefav = await Favorite.findByIdAndDelete(favorite_id);
    res.status(200).send(deletefav);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

module.exports = router;
