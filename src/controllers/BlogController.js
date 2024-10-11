const BlogService = require("../services/BlogService");

const createBlog = async (req, res) => {
  try {
    const { title, author, typeName, content, image, typeSlug } = req.body;
    if (!title || !author || !typeName || !content || !image) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const response = await BlogService.createBlog(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const data = req.body;
    if (!blogId) {
      return res.status(200).json({
        status: "ERR",
        message: "The blogId is required",
      });
    }
    const response = await BlogService.updateBlog(blogId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const getDetailsBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    if (!blogId) {
      return res.status(200).json({
        status: "ERR",
        message: "The blogId is required",
      });
    }
    const response = await BlogService.getDetailsBlog(blogId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    if (!blogId) {
      return res.status(200).json({
        status: "ERR",
        message: "The blogId is required",
      });
    }
    const response = await BlogService.deleteBlog(blogId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const getAllBlog = async (req, res) => {
  try {
    const { limit, page, sort, name, typeBlog } = req.query;
    const response = await BlogService.getAllBlog(
      Number(limit) || null,
      Number(page) || 0,
      sort,
      name,
      typeBlog
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const getAllType = async (req, res) => {
  try {
    const response = await BlogService.getAllType();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
module.exports = {
  createBlog,
  updateBlog,
  getDetailsBlog,
  deleteBlog,
  getAllBlog,
  getAllType,
};
