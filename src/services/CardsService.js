const Cards = require("../models/CardModel")
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");

const getAllCard = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const allCards = await Cards.find().sort({ createdAt: -1, updatedAt: -1 });
        resolve({
          status: "OK",
          message: "Success",
          data: allCards,
        });
      } catch (e) {
        reject(e);
      }
    });
  };

  module.exports = {
    getAllCard
  }