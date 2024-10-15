const mongoose = require("mongoose");

const uri = "mongodb+srv://eprint:Kds513T4NpsjM4Jw@cluster0.4syayai.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

const Category = mongoose.model("Category", client);
module.exports = Category;
