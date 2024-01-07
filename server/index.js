import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import sessionRoutes from "./routes/session.js";
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/session", sessionRoutes);

const CONNECTION_URL =
  "mongodb+srv://matteopuccifx:PD72aYCZZ1fpkcav@cluster0.qlvwcgi.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5001;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log("Server is running on ", PORT))
  )
  .catch((err) => console.log(err));
// mongoose.set("useFindAndModify", false);
