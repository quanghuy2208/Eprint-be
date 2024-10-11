const Collection = require("../models/CollectionModel");

const createCollection = (newCollection) => {
  return new Promise(async (resolve, reject) => {
    const { typeName, typeSlug, fileName, fileLink } = newCollection;
    try {
      const checkCollection = await Collection.findOne({
        typeName: typeName,
      });
      if (checkCollection !== null) {
        resolve({
          status: "ERR",
          message: "The name of Collection is already exist",
        });
      }
      const newCollection = await Collection.create({
        typeName,
        typeSlug,
        fileName,
        fileLink,
      });
      if (newCollection) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: newCollection,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const updateCollection = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkCollection = await Collection.findOne({
        _id: id,
      });
      if (checkCollection === null) {
        resolve({
          status: "ERR",
          message: "The Collection is not defined",
        });
      }

      const updatedCollection = await Collection.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedCollection,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteCollection = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkCollection = await Collection.findOne({
        _id: id,
      });
      if (checkCollection === null) {
        resolve({
          status: "ERR",
          message: "The Collection is not defined",
        });
      }

      await Collection.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete Collection success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsCollection = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const collection = await Collection.findOne({
        _id: id,
      });
      if (collection === null) {
        resolve({
          status: "ERR",
          message: "The Collection is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCESS",
        data: collection,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getAllCollection = (limit, page, sort, name, typeCollection) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalCollection = await Collection.countDocuments();
      let allCollection = [];
      if (name || typeCollection) {
        const filter = {};
        if (name) filter.name = { $regex: name };
        if (typeCollection) filter.typeSlug = typeCollection;
        const allObjectFilter = await Collection.find(filter)
          .limit(limit)
          .skip(page * limit)
          .sort({ createdAt: -1, updatedAt: -1 });
        resolve({
          status: "OK",
          message: "Success",
          data: allObjectFilter,
          total: totalCollection,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalCollection / limit),
        });
      }
      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        const allCollectionSort = await Collection.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort)
          .sort({ createdAt: -1, updatedAt: -1 });
        resolve({
          status: "OK",
          message: "Success",
          data: allCollectionSort,
          total: totalCollection,
          pageCurrent: Number(page + 1),
          totalPage: Math.ceil(totalCollection / limit),
        });
      }
      if (!limit) {
        allCollection = await Collection.find().sort({
          createdAt: -1,
          updatedAt: -1,
        });
      } else {
        allCollection = await Collection.find()
          .limit(limit)
          .skip(page * limit)
          .sort({ createdAt: -1, updatedAt: -1 });
      }
      resolve({
        status: "OK",
        message: "Success",
        data: allCollection,
        total: totalCollection,
        pageCurrent: Number(page + 1),
        totalPage: Math.ceil(totalCollection / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getAllType = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allType = await Collection.distinct("typeName");
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
  createCollection,
  updateCollection,
  getDetailsCollection,
  deleteCollection,
  getAllCollection,
  getAllType,
};
