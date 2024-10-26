const TypeService = require("../services/TypeService");
// const JwtService = require("../services/JwtService");
// const Size = require("../models/UserModel");

const getallType = async (req, res) => {
  try {
    const response = await TypeService.getAllType();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
    getallType,
};
