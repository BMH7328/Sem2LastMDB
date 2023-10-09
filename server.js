const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { MONGODB_URL } = require("./config");

const app = express();
app.use(express.json());
const port = 5000;

// setup cors
const corsHandler = cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
  preflightContinue: true,
});

app.use(corsHandler);

// MongoDB Connection
mongoose
  .connect(MONGODB_URL + "sem2projectreact")
  .then(() => console.log("MongoDBConnected... "))
  .catch((err) => console.log(err));

// routes
const authRouter = require("./routes/auth");
const characterRouter = require("./routes/character");
const elementRouter = require("./routes/element");
const regionRouter = require("./routes/region");
const favoriteRouter = require("./routes/favorite");
const imageRouter = require("./routes/image");
const weaponRouter = require("./routes/weapon");
const weapontypeRouter = require("./routes/weapontype");

app.use("/auth", authRouter);
app.use("/characters", characterRouter);
app.use("/elements", elementRouter);
app.use("/regions", regionRouter);
app.use("/favorites", favoriteRouter);
app.use("/images", imageRouter);
app.use("/weapons", weaponRouter);
app.use("/weapontypes", weapontypeRouter);

/*
    http://localhost:5000/auth/register
    http://localhost:5000/auth/login
*/

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Sem 2 Project React");
});

// Server listening
app.listen(port, () => console.log(`Server started on port ${port}`));
