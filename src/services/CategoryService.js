const Category = require("../models/CategoryModel.js");
const bcrypt = require("bcrypt");
// const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");

async function getAllCategorylv1() {
    try {
      await Category.connect();
      console.log("Kết nối thành công!");
  
      const database = Category.db("user");
      const collection = database.collection("category_products");
  
      // Lấy tất cả dữ liệu trong collection
      const categories = await collection.find({}).toArray();
  
      console.log("Dữ liệu đã lấy được:", categories);
    } catch (error) {
      console.error("Lỗi khi kết nối hoặc lấy dữ liệu:", error);
    } finally {
      await Category.close();
    }
  }

module.exports = {
    getAllCategorylv1,
};
