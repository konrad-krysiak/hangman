import json from "../data/words.json" assert { type: "json" };
import { getRandomInt } from "../utils/randomNumber.js";

export const getWords = (_, res) => {
  try {
    const words = json;
    res.status(200).json(words);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export const getRandomWord = (_, res) => {
  try {
    const jsonLen = json.length;
    const randomWordIndex = getRandomInt(0, jsonLen - 1);
    const randomWord = json[randomWordIndex];
    res.status(200).json(randomWord);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};
