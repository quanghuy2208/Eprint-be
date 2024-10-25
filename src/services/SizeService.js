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

const updateSize = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkSize = await Size.findOne({
        _id: id,
      });
      if (checkSize === null) {
        resolve({
          status: "ERR",
          message: "The Size is not defined",
        });
      }

      const updatedSize = await Size.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedSize,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteSize = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const checSize = await Size.findOne({
          _id: id,
        });
        if (checSize === null) {
          resolve({
            status: "ERR",
            message: "The size is not defined",
          });
        }
  
        await Size.findByIdAndDelete(id);
        resolve({
          status: "OK",
          message: "Delete size success",
        });
      } catch (e) {
        reject(e);
      }
    });
  };

module.exports = {
    getAllSser,
    updateSize,
    deleteSize,
};
