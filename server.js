import express from "express";
import cors from "cors";
import { computeAdvanced } from "./controller.js";

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static("public"));

app.post("/advanced-computing", computeAdvanced);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
