import mongoose from "mongoose";
import Session from "../models/sessionModel.js";

export const saveSession = async (req, res) => {
  try {
    const { date, seconds } = req.body;

    // Salvataggio della sessione nel database
    const session = new Session({ date, seconds });
    await session.save();

    res.status(201).json({ message: "Session saved successfully" });
  } catch (error) {
    console.error("Error saving session:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSavedSessions = async (req, res) => {
  try {
    // Logica per ottenere le sessioni salvate dal database
    const sessions = await Session.find();

    res.status(200).json(sessions);
  } catch (error) {
    console.error("Error getting saved sessions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
