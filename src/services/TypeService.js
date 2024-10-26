const Type = require("../models/TypeModel");
// const bcrypt = require("bcrypt");
// const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");

const getAllType = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allType = await Type.find().sort({ createdAt: -1, updatedAt: -1 });
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
    getAllType,
};
