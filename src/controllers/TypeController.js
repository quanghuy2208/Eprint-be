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

const getDetailType = async (req, res) => {
    try {
      const typeId = req.params.id;
      if (!typeId) {
        return res.status(200).json({
          status: "ERR",
          message: "The typeId is required",
        });
      }
      const response = await TypeService.getDetailsTypet(typeId);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  };

module.exports = {
    getallType,
    getDetailType,
};
