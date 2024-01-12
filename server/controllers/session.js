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

export const deleteSession = async (req, res) => {
  const { id: _id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(400).json({ message: "Id sessione non valido" });

    await Session.findByIdAndDelete(_id);

    res.json({ message: "Sessione rimossa con successo" });
  } catch (error) {
    console.error("Errore durante l'eliminazione della sessione:", error);

    res
      .status(500)
      .json({
        message:
          "Errore interno del server durante l'eliminazione della sessione",
      });
  }
};
