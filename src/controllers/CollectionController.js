const CollectionService = require("../services/CollectionService");

const createCollection = async (req, res) => {
  try {
    const { typeName, typeSlug, fileName, fileLink } = req.body;
    if (!typeName || !fileName) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const response = await CollectionService.createCollection(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const updateCollection = async (req, res) => {
  try {
    const collectionId = req.params.id;
    const data = req.body;
    if (!collectionId) {
      return res.status(200).json({
        status: "ERR",
        message: "The CollectionId is required",
      });
    }
    const response = await CollectionService.updateCollection(
      collectionId,
      data
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const getDetailsCollection = async (req, res) => {
  try {
    const collectionId = req.params.id;
    if (!collectionId) {
      return res.status(200).json({
        status: "ERR",
        message: "The collectionId is required",
      });
    }
    const response = await CollectionService.getDetailsCollection(collectionId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const deleteCollection = async (req, res) => {
  try {
    const collectionId = req.params.id;
    if (!collectionId) {
      return res.status(200).json({
        status: "ERR",
        message: "The collectionId is required",
      });
    }
    const response = await CollectionService.deleteCollection(collectionId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const getAllCollection = async (req, res) => {
  try {
    const { limit, page, sort, name, typeCollection } = req.query;
    const response = await CollectionService.getAllCollection(
      Number(limit) || null,
      Number(page) || 0,
      sort,
      name,
      typeCollection
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
    const response = await CollectionService.getAllType();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
module.exports = {
  createCollection,
  updateCollection,
  getDetailsCollection,
  deleteCollection,
  getAllCollection,
  getAllType,
};
