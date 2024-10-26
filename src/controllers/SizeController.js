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

const getDetailsSize = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The productId is required",
      });
    }
    const response = await ProductService.getDetailsProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateSize = async (req, res) => {
  // console.log
  try {
    const sizetId = req.params.id;
    const data = req.body;
    if (!sizetId) {
      return res.status(200).json({
        status: "ERR",
        message: "The sizetId is required",
      });
    }
    const response = await SizeService.updateSize(sizetId, data);
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
    getDetailsSize,
    updateSize,
    deleteSize,
};
