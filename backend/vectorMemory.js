const { pipeline } = require("@xenova/transformers");
const Vector = require("./models/Vector");

let embedder;

// Load embedding model only once
async function getEmbedder() {

  if (!embedder) {
    embedder = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
  }

  return embedder;
}


// Store vector embedding
async function storeVector(text) {

  const extractor = await getEmbedder();

  const embedding = await extractor(text, {
    pooling: "mean",
    normalize: true
  });

  // Prevent duplicate storage
  const exists = await Vector.findOne({ text });

  if (!exists) {

    await Vector.create({
      text: text,
      embedding: Array.from(embedding.data)
    });

  }

}


// Retrieve stored vectors
async function getVectors() {

  const data = await Vector.find();

  return data;

}


module.exports = {
  storeVector,
  getVectors
};