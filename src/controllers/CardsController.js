const CardsService = require("../services/CardsService");
const JwtService = require("../services/JwtService");
const Cards = require("../models/CardModel");

const getAllCards = async (req, res) => {
    try {
      const response = await CardsService.getAllCard();
      return res.status(200).json(response);
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  };

  const getCardsUser = async (req, res) => {
    try {
      const response = await CardsService.getCardsUser();
      return res.status(200).json(response);
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  };

  const updateCard = async (req, res) => {

    try {
      const cardsId = req.params.id;
      const data = req.body;
      if (!cardsId) {
        return res.status(200).json({
          status: "ERR",
          message: "Thiếu trường ID giỏ hàng",
        });
      }
      const response = await CardsService.updateCard(cardsId, data);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  };

  const deleteCard = async (req, res) => {
    try {

      const cardsId = req.params.id;
      const data = req.body;
      
      if (!cardsId) {
        return res.status(400).json({
          status: "ERR",
          message: "Thiếu trường ID giỏ hàng",
        });
      }
  
      const response = await CardsService.deleteCard(cardsId, data);
  
      if (response.status === "ERR") {
        return res.status(400).json({
          status: "ERR",
          message: response.message,
        });
      }
  
      return res.status(200).json({
        status: "OK",
        message: "Xóa sản phẩm khỏi giỏ hàng thành công",
        data: response.data,
      });
  
    } catch (e) {
      console.error("Error during deleteCard:", e);
      return res.status(500).json({
        status: "ERR",
        message: "Có lỗi xảy ra trong quá trình xóa sản phẩm khỏi giỏ hàng",
        error: e.message || e,
      });
    }
  };

  module.exports = {
    getAllCards,
    getCardsUser,
    updateCard,
    deleteCard
  }