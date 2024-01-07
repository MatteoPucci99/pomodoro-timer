import express from "express";
import { getSavedSessions, saveSession } from "../controllers/session.js";

const router = express.Router();

router.post("/savedsessions", saveSession);
router.get("/savedsessions", getSavedSessions);

export default router;
