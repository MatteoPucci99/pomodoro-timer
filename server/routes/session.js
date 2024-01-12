import express from "express";
import {
  deleteSession,
  getSavedSessions,
  saveSession,
} from "../controllers/session.js";

const router = express.Router();

router.post("/savedsessions", saveSession);
router.get("/savedsessions", getSavedSessions);
router.delete("/savedsessions/:id", deleteSession);

export default router;
