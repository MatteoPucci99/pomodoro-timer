import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  seconds: {
    type: Number,
  },
});

const Session = mongoose.model("Session", sessionSchema);

export default Session;
