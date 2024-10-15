const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
      name: { type: String, required: true, unique: true },
    },
    {
      timestamps: true,
    }
  );

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;


// const { MongoClient, ObjectId } = require('mongodb');

// const uri = "mongodb+srv://eprint:Kds513T4NpsjM4Jw@cluster0.4syayai.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// const client = new MongoClient(uri);

// module.exports = client;

