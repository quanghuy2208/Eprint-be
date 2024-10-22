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
    console.log(req.params)
    try {
      const userId = req.params.id;
      const data = req.body;
      if (!userId) {
        return res.status(200).json({
          status: "ERR",
          message: "The userId is required",
        });
      }
      const response = await UserService.updateCard(userId, data);
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
    updateCard
  }