import mongoose from "mongoose";

const playerSchema = mongoose.Schema({
  name: { type: String, required: true },
  games: { type: Number, required: true },
  chancesLeft: { type: Number, required: true },
});

export default mongoose.model("Player", playerSchema);
