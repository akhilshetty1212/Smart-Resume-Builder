import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Test route
app.get("/", (req, res) => {
  res.send("Smart Resume Builder Backend is Running!");
});

// AI Resume Suggestions
app.post("/api/suggestions", async (req, res) => {
  try {
    const { resume } = req.body;

    if (!resume) {
      return res.status(400).json({
        error: "Resume details are required",
      });
    }

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      instructions: `You are a professional resume expert.
      Analyse the given resume and provide clear,
      useful suggestions to improve it.
      Focus on summary, skills, education and projects.
      Do not invent qualifications or experience.
      Give suggestions in simple bullet points.`,
      input: JSON.stringify(resume),
    });

    res.json({
      suggestions: response.output_text,
    });

  } catch (error) {
    console.error("AI Error:", error.message);

    res.status(500).json({
      error: "Unable to generate AI suggestions",
    });
  }
});

// Start server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});