const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    typeName: { type: String, required: true },
    typeSlug: { type: String, required: true },
    content: { type: String, required: true },
    // desc: { type: String, required: true },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
