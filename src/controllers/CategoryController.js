const CategoryService = require("../services/CategoryService");
const JwtService = require("../services/JwtService");
// const Category = require("../models/CategoryModel.js");

const getAllUser = async (req, res) => {
  try {
    const response = await CategoryService.getAllUser();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  getAllUser,
};
