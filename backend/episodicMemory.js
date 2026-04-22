const EpisodicMemory = require("./models/EpisodicMemory");

async function storeFact(text){

text = text.toLowerCase();

if(text.includes("my name is")){

const name = text.split("my name is")[1].trim();

await EpisodicMemory.findOneAndUpdate(
{key:"name"},
{value:name},
{upsert:true}
);

}

if(text.includes("i live in")){

const city = text.split("i live in")[1].trim();

await EpisodicMemory.findOneAndUpdate(
{key:"city"},
{value:city},
{upsert:true}
);

}

}

async function getFacts(){

const data = await EpisodicMemory.find();

let facts = "";

data.forEach(item => {

facts += item.key + ": " + item.value + "\n";

});

return facts;

}

module.exports = {
storeFact,
getFacts
};