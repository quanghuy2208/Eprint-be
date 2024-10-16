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

const deleteSize = async (req, res) => {
    console.log(req.params.id)
    try {
      const SizeId = req.params.id;
      if (!SizeId) {
        return res.status(200).json({
          status: "ERR",
          message: "The SizeId is required",
        });
      }
      const response = await SizeService.deleteSize(SizeId);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  };

module.exports = {
    getallSize,
    deleteSize,
};
