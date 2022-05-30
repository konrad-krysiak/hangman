import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { port } from "./config.js";
import playerRoutes from "./routes/player.js";
import wordRoutes from './routes/word.js';

const app = express();

// Calling use(cors()) will enable the express server to respond to preflight requests.
// A preflight request is basically an OPTION
// request sent to the server before the actual request is sent, in order to ask which origin and which request options the server accepts.
app.use(cors());
app.use(express.json());
app.use("/player", playerRoutes);
app.use("/word", wordRoutes);


app.use("/", (req, res) => {
    res.json({message: "Server running"});
})


//connection with db
const CONNECTION_URL =
  "mongodb+srv://hangman:somepassword@hangmancluster.yuhzx8v.mongodb.net/?retryWrites=true&w=majority";

//create a server that browsers can connect to
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(port, () => console.log(`Server running on port: ${port}`))
  )
  .catch((err) => console.log(err));
