const SemanticMemory = require("./models/SemanticMemory");

const topics = [
"machine learning",
"artificial intelligence",
"ai",
"python",
"database",
"mongodb",
"deep learning"
];

async function storeTopic(text){

for(const topic of topics){

if(text.toLowerCase().includes(topic)){

const exists = await SemanticMemory.findOne({topic});

if(!exists){

await SemanticMemory.create({topic});

}

}

}

}

async function getTopics(){

const data = await SemanticMemory.find();

return data.map(item=>item.topic);

}

module.exports = {
storeTopic,
getTopics
};