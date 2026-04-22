
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");

const { storeVector, getVectors } = require("./vectorMemory");

const app = express();
app.use(cors());
app.use(express.json());

/* =========================
   MONGODB
========================= */
mongoose.connect("mongodb://127.0.0.1:27017/chatbot")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

/* =========================
   MEMORY STORAGE
========================= */
let userFacts = [];
let userTopics = [];

/* =========================
   COSINE SIMILARITY
========================= */
function cosineSimilarity(a, b) {
  if (!a || !b || a.length !== b.length) return 0;

  let dot = 0;
  let magA = 0;
  let magB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }

  if (magA === 0 || magB === 0) return 0;

  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

/* =========================
   TEST ROUTE
========================= */
app.get("/", (req, res) => {
  res.send("Backend working ✅");
});

/* =========================
   CHAT ROUTE
========================= */
app.post("/api/chat", async (req, res) => {

  try {

    const userMessageOriginal = req.body.message || "";
    const userMessage = userMessageOriginal.toLowerCase();

    /* ===== EPISODIC MEMORY ===== */
    if (userMessage.includes("my name is")) {
      userFacts.push(userMessageOriginal);
    }

    /* ===== SEMANTIC MEMORY ===== */
    if (
      userMessage.includes("i like") ||
      userMessage.includes("i love") ||
      userMessage.includes("i enjoy")
    ) {
      userTopics.push(userMessageOriginal);
    }

    /* ===== VECTOR MEMORY ===== */
    try {
      await storeVector(userMessageOriginal);
    } catch (e) {
      console.log("Vector store error:", e.message);
    }

    let bestMatch = "";

    try {
      const allVectors = await getVectors();

      if (allVectors.length > 1) {
        const current = allVectors[allVectors.length - 1];

        let maxSim = -1;

        for (let item of allVectors) {

          if (!item.embedding || item.text === current.text) continue;

          const sim = cosineSimilarity(current.embedding, item.embedding);

          if (sim > maxSim) {
            maxSim = sim;
            bestMatch = item.text;
          }
        }
      }

    } catch (e) {
      console.log("Vector read error:", e.message);
    }

    console.log("SIMILAR MEMORY:", bestMatch);

    /* ===== CONTEXT ===== */
    const context = `
User Facts:
${userFacts.join("\n")}

User Interests:
${userTopics.join("\n")}

Relevant Memory:
${bestMatch}
`;

    console.log("CONTEXT:", context);

    /* ===== API KEY CHECK ===== */
    if (!process.env.OPENROUTER_API_KEY) {
      console.log("❌ API KEY MISSING");
      return res.json({ reply: "API Key not found" });
    }

    /* ===== AI CALL ===== */
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a smart conversational AI.

Speak naturally like ChatGPT.

- Use memory to personalize answers
- Do NOT use numbering unless needed
- Keep responses clean and readable

Memory:
${context}`
          },
          {
            role: "user",
            content: userMessageOriginal
          }
        ]
      },
      {
        headers: {
          Authorization: "Bearer " + process.env.OPENROUTER_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = response.data.choices[0].message.content;

    res.json({ reply });

  } catch (err) {

    console.log("====== FINAL ERROR ======");
    console.log(err.response?.data || err.message);
    console.log("========================");

    res.json({ reply: "AI Error" });
  }
});

/* =========================
   MEMORY ROUTE
========================= */
app.get("/api/memory", async (req, res) => {

  try {

    const vectors = await getVectors();

    res.json({
      facts: userFacts,
      topics: userTopics,
      vectors: vectors.map(v => v.text)
    });

  } catch (err) {
    res.json({
      facts: [],
      topics: [],
      vectors: []
    });
  }

});

/* =========================
   START SERVER
========================= */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});