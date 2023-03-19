import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { port } from "./config.js";
import playerRoutes from "./routes/player.js";
import wordRoutes from "./routes/word.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/player", playerRoutes);
app.use("/word", wordRoutes);

app.use("/", (req, res) => {
  res.json({ message: "Server running" });
});

//connection with db
const CONNECTION_URL = "mongodb://mongo:27017/mongo-hangman";

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(port, () => console.log(`Server running on port: ${port}`))
  )
  .catch((err) => console.log(err));
