const OrderCustomService = require("../services/OrderCustomService");

const createOrderCustom = async (req, res) => {
  try {
    const {
      name,
      material,
      materialType,
      size,
      side,
      quantity,
      machining,
      importFile,
      userName,
      email,
      phone,
      address,
    } = req.body;
    if (
      !name ||
      !material ||
      !materialType ||
      !size ||
      !side ||
      !quantity ||
      !machining ||
      !userName ||
      !email ||
      !phone ||
      !address
    ) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const response = await OrderCustomService.createOrderCustom(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateOrderCustom = async (req, res) => {
  try {
    const OrderCustomId = req.params.id;
    const data = req.body;
    if (!OrderCustomId) {
      return res.status(200).json({
        status: "ERR",
        message: "The OrderCustomId is required",
      });
    }
    const response = await OrderCustomService.updateOrderCustom(
      OrderCustomId,
      data
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailsOrderCustom = async (req, res) => {
  try {
    const OrderCustomId = req.params.id;
    if (!OrderCustomId) {
      return res.status(200).json({
        status: "ERR",
        message: "The OrderCustomId is required",
      });
    }
    const response = await OrderCustomService.getDetailsOrderCustom(
      OrderCustomId
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteOrderCustom = async (req, res) => {
  try {
    const OrderCustomId = req.params.id;
    if (!OrderCustomId) {
      return res.status(200).json({
        status: "ERR",
        message: "The OrderCustomId is required",
      });
    }
    const response = await OrderCustomService.deleteOrderCustom(OrderCustomId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteMany = async (req, res) => {
  try {
    const ids = req.body.ids;
    if (!ids) {
      return res.status(200).json({
        status: "ERR",
        message: "The ids is required",
      });
    }
    const response = await OrderCustomService.deleteManyOrderCustom(ids);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllOrderCustom = async (req, res) => {
  try {
    const { limit, page, sort, name, typeOrderCustom } = req.query;
    const response = await OrderCustomService.getAllOrderCustom(
      Number(limit) || null,
      Number(page) || 0,
      sort,
      name,
      typeOrderCustom
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllType = async (req, res) => {
  try {
    const response = await OrderCustomService.getAllType();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createOrderCustom,
  updateOrderCustom,
  getDetailsOrderCustom,
  deleteOrderCustom,
  getAllOrderCustom,
  deleteMany,
  getAllType,
};
