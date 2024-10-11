const OrderCustom = require("../models/OrderCustomModel");

const createOrderCustom = (newOrderCustom) => {
  return new Promise(async (resolve, reject) => {
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
    } = newOrderCustom;
    try {
      const newOrderCustom = await OrderCustom.create({
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
      });
      if (newOrderCustom) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: newOrderCustom,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateOrderCustom = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkOrderCustom = await OrderCustom.findOne({
        _id: id,
      });
      if (checkOrderCustom === null) {
        resolve({
          status: "ERR",
          message: "The OrderCustom is not defined",
        });
      }

      const updatedOrderCustom = await OrderCustom.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedOrderCustom,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteOrderCustom = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkOrderCustom = await OrderCustom.findOne({
        _id: id,
      });
      if (checkOrderCustom === null) {
        resolve({
          status: "ERR",
          message: "The OrderCustom is not defined",
        });
      }

      await OrderCustom.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete OrderCustom success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsOrderCustom = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const OrderCustom = await OrderCustom.findOne({
        _id: id,
      });
      if (OrderCustom === null) {
        resolve({
          status: "ERR",
          message: "The OrderCustom is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCESS",
        data: OrderCustom,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllOrderCustom = (limit, page, sort, name, typeOrderCustom) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalOrderCustom = await OrderCustom.countDocuments();
      let allOrderCustom = [];
      if (name || typeOrderCustom) {
        const filter = {};
        if (name) filter.name = { $regex: name };
        if (typeOrderCustom) filter.typeSlug = typeOrderCustom;
        const allObjectFilter = await OrderCustom.find(filter)
          .limit(limit)
          .skip(page * limit)
          .sort({ createdAt: -1, updatedAt: -1 });
        resolve({
          status: "OK",
          message: "Success",
          data: allObjectFilter,
          total: totalOrderCustom,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalOrderCustom / limit),
        });
      }
      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        const allOrderCustomSort = await OrderCustom.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort)
          .sort({ createdAt: -1, updatedAt: -1 });
        resolve({
          status: "OK",
          message: "Success",
          data: allOrderCustomSort,
          total: totalOrderCustom,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalOrderCustom / limit),
        });
      }
      if (!limit) {
        allOrderCustom = await OrderCustom.find().sort({
          createdAt: -1,
          updatedAt: -1,
        });
      } else {
        allOrderCustom = await OrderCustom.find()
          .limit(limit)
          .skip(page * limit)
          .sort({ createdAt: -1, updatedAt: -1 });
      }
      resolve({
        status: "OK",
        message: "Success",
        data: allOrderCustom,
        total: totalOrderCustom,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalOrderCustom / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllType = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allType = await OrderCustom.distinct("typeName");
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

module.exports = {
  createOrderCustom,
  updateOrderCustom,
  getDetailsOrderCustom,
  deleteOrderCustom,
  getAllOrderCustom,
  getAllType,
};
