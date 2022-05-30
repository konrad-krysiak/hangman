import express from "express";
import { getWords, getRandomWord } from "../controllers/word_controller.js";

const router = express.Router();


router.get("/", getWords);
router.get("/random", getRandomWord);

export default router;