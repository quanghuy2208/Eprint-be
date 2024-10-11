const Blog = require("../models/BlogModel");

const createBlog = (newBlog) => {
  return new Promise(async (resolve, reject) => {
    const { title, author, typeName, content, image, typeSlug } = newBlog;
    try {
      const checkBlog = await Blog.findOne({
        title: title,
      });
      if (checkBlog !== null) {
        resolve({
          status: "ERR",
          message: "The title of Blog is already",
        });
      }
      const newBlog = await Blog.create({
        title,
        author,
        typeName,
        content,
        image,
        typeSlug,
      });
      if (newBlog) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: newBlog,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateBlog = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkBlog = await Blog.findOne({
        _id: id,
      });
      if (checkBlog === null) {
        resolve({
          status: "ERR",
          message: "The Blog is not defined",
        });
      }

      const updatedBlog = await Blog.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedBlog,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteBlog = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkBlog = await Blog.findOne({
        _id: id,
      });
      if (checkBlog === null) {
        resolve({
          status: "ERR",
          message: "The Blog is not defined",
        });
      }

      await Blog.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete Blog success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsBlog = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const blog = await Blog.findOne({
        _id: id,
      });
      if (blog === null) {
        resolve({
          status: "ERR",
          message: "The Blog is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCESS",
        data: blog,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getAllBlog = (limit, page, sort, name, typeBlog) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalBlog = await Blog.countDocuments();
      let allBlog = [];
      if (name || typeBlog) {
        const filter = {};
        if (name) filter.name = { $regex: name };
        if (typeBlog) filter.typeSlug = typeBlog;
        const totalBlog = await Blog.countDocuments(filter);
        const allObjectFilter = await Blog.find(filter)
          .limit(limit)

          .skip(page * limit)
          .sort({ createdAt: -1, updatedAt: -1 });
        resolve({
          status: "OK",
          message: "Success",
          data: allObjectFilter,
          total: totalBlog,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalBlog / limit),
        });
      }
      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        const allBlogSort = await Blog.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort)
          .sort({ createdAt: -1, updatedAt: -1 });
        resolve({
          status: "OK",
          message: "Success",
          data: allBlogSort,
          total: totalBlog,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalBlog / limit),
        });
      }
      if (!limit) {
        allBlog = await Blog.find().sort({
          createdAt: -1,
          updatedAt: -1,
        });
      } else {
        allBlog = await Blog.find()
          .limit(limit)
          .skip(page * limit)
          .sort({ createdAt: -1, updatedAt: -1 });
      }
      resolve({
        status: "OK",
        message: "Success",
        data: allBlog,
        total: totalBlog,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalBlog / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getAllType = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allType = await Blog.distinct("typeName");
      resolve({
        status: "OK",
        message: "Success",
        data: allType,
      });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createBlog,
  updateBlog,
  getDetailsBlog,
  deleteBlog,
  getAllBlog,
  getAllType,
};
