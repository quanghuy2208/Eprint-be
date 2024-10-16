const Size = require("../models/SizeModel");
// const bcrypt = require("bcrypt");
// const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");

const getAllSser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allSize = await Size.find().sort({ createdAt: -1, updatedAt: -1 });
      resolve({
        status: "OK",
        message: "Success",
        data: allSize,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
    getAllSser,
};
