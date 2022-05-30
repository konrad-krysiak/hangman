import PlayerModel from "../models/Player.js";

export const addPlayer = async (req, res) => {
  const { name, chancesLeft } = req.body;
  try {
    const oldPlayer = await PlayerModel.findOne({ name });
    if (oldPlayer) {
      console.log("Player already exists");
      return res.status(400).json({ message: "Player already exists" });
    }
    const newUser = await PlayerModel.create({ name, chancesLeft, games: 1 });
    console.log(newUser);
    res.status(200).json({ result: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error while adding a player" });
  }
};

export const addResult = async (req, res) => {
  const { name, chancesLeft } = req.body;
  try {
    const player = await PlayerModel.findOne({ name });
    if (!player) {
      const newPlayer = await PlayerModel.create({
        name,
        chancesLeft,
        games: 1,
      });
      return res.status(200).json(newPlayer);
    }
    await PlayerModel.findOneAndUpdate(
      { name },
      {
        games: player.games + 1,
        chancesLeft: player.chancesLeft + chancesLeft,
      }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    res
      .status(500)
      .json({ success: false });
  }
};

export const getPlayers = async (_, res) => {
  try {
    const players = await PlayerModel.find();
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: "Error while trying to read all players" });
  }
};
