const CategoryService = require("../services/CategoryService");
const JwtService = require("../services/JwtService");
// const Category = require("../models/CategoryModel.js");

const getAllCategorylv1 = async (req, res) => {
    console.log("aaaaaaaaaaaaaaaaaaaaaa")
  try {
    const response = await CategoryService.getAllCategorylv1();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
    getAllCategorylv1,
};
