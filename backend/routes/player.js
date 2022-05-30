import express from "express";
import { addPlayer, addResult, getPlayers } from "../controllers/player_controller.js";

const router = express.Router();


router.get("/", getPlayers);
router.post("/", addPlayer);
router.post("/result", addResult);


export default router;