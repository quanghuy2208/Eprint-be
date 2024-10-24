const Cards = require("../models/CardModel")
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");

const getAllCard = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const allCards = await Cards.find().sort({ createdAt: -1, updatedAt: -1 });
        resolve({
          status: "OK",
          message: "Success",
          data: allCards,
        });
      } catch (e) {
        reject(e);
      }
    });
  };

  const getCardsUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const allCards = await Cards.find().sort({ createdAt: -1, updatedAt: -1 });
        console.log(allCards)
        resolve({
          status: "OK",
          message: "Success",
          data: allCards,
        });
      } catch (e) {
        reject(e);
      }
    });
  };

  const addToCard = (newProduct) => {

    return new Promise(async (resolve, reject) => {
      console.log(newProduct)
      const { productId, quantity, user_id, products_name , products_image, products_price } = newProduct;
  
      try {
        // Kiểm tra xem người dùng đã có giỏ hàng chưa
        let cart = await Cards.findOne({ user_id: user_id });
  
        if (!cart) {
          cart = await Cards.create({
            user_id: user_id,
            products: [{
              productId,
              quantity,
              products_image,
              products_price,
              products_name,
            }],
          });
  
          return resolve({
            status: "OK",
            message: "Cart created and product added successfully",
            data: cart,
          });
        }
  
        cart.products.push({
          productId,
          quantity,
          products_image,
          products_price,
          products_name,
        });
  
        await cart.save();
  
        resolve({
          status: "OK",
          message: "Product added to cart successfully",
          data: cart,
        });
      } catch (e) {
        reject(e);
      }
    });
  };
  
  const updateCard = async (cartId, productId) => {

    try {
      const cart = await Cards.findById(cartId);
      if (!cart) {
        return {
          status: "ERR",
          message: "Giỏ hàng không tồn tại",
        };
      }
  
      const productIndex = cart.products.findIndex(product => product.products_id === productId.productId);
      if (productIndex === -1) {
        return {
          status: "ERR",
          message: "Sản phẩm không tồn tại trong giỏ hàng",
        };
      }
  
      cart.products[productIndex].quantity = productId.quantity;
  
      await cart.save();
  
      return {
        status: "OK",
        message: "Cập nhật giỏ hàng thành công",
        data: cart,
      };
    } catch (e) {
      return {
        status: "ERR",
        message: "Đã xảy ra lỗi",
        error: e,
      };
    }
  };

  const deleteCard = async (cartId, productId) => {
    console.log(productId)
    try {

      const cart = await Cards.findById(cartId);
      if (!cart) {
        return {
          status: "ERR",
          message: "Giỏ hàng không tồn tại",
        };
      }
  
      const productIndex = cart.products.findIndex(product => product.products_id === productId);
      
      if (productIndex === -1) {
        return {
          status: "ERR",
          message: "Sản phẩm không tồn tại trong giỏ hàng",
        };
      }
  
      cart.products.splice(productIndex, 1);
  
      await cart.save();
  
      return {
        status: "OK",
        message: "Xóa sản phẩm khỏi giỏ hàng thành công",
        data: cart,
      };
    } catch (e) {
      return {
        status: "ERR",
        message: "Đã xảy ra lỗi",
        error: e,
      };
    }
  };
  
  module.exports = {
    getAllCard,
    getCardsUser,
    updateCard,
    deleteCard,
    addToCard
  }