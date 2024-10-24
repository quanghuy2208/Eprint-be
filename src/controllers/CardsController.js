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
      console.log(data)
      if (!cardsId) {
        return res.status(200).json({
          status: "ERR",
          message: "Thiếu trường ID giỏ hàng",
        });
      }
      const response = await CardsService.deleteCard(cardsId, data);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  };

  module.exports = {
    getAllCards,
    getCardsUser,
    updateCard,
    deleteCard
  }