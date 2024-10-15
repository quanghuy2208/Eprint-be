const CategoryProduct = require("../models/CategoryModel.js");
const bcrypt = require("bcrypt");

  const getAllCategorylv1 = () => {
    return new Promise(async (resolve, reject) => {

      try {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaa")
        const allCategorylv1 = await CategoryProduct.find().sort({ createdAt: -1, updatedAt: -1 });
        resolve({
          status: "OK",
          message: "Success",
          data: allCategorylv1,
        });
      } catch (e) {
        reject(e);
      }
    });
  };
  

module.exports = {
    getAllCategorylv1,
};
