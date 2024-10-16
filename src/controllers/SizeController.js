const SizeService = require("../services/SizeService");
// const JwtService = require("../services/JwtService");
// const Size = require("../models/UserModel");

const getallSize = async (req, res) => {
  try {
    const response = await SizeService.getAllSser();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
    getallSize,
};
