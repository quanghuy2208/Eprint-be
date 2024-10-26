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

const getDetailsTypet = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const type = await Type.findOne({
          _id: id,
        });
        if (type === null) {
          resolve({
            status: "ERR",
            message: "The type is not defined",
          });
        }
  
        resolve({
          status: "OK",
          message: "SUCESS",
          data: type,
        });
      } catch (e) {
        reject(e);
      }
    });
  };

module.exports = {
    getAllType,
    getDetailsTypet,
};
