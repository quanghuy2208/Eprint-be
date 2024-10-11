const UserRouter = require("./UserRouter");
const ProductRouter = require("./ProductRouter");
const OrderRouter = require("./OrderRouter");
const PaymentRouter = require("./PaymentRouter");
const BlogRouter = require("./BlogRouter");
const OrderCustomRouter = require("./OrderCustomRouter");
const CollectionRouter = require("./CollectionRouter");
const UploadFileRouter = require("./UploadFileRouter");
const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/product", ProductRouter);
  app.use("/api/order", OrderRouter);
  app.use("/api/payment", PaymentRouter);
  app.use("/api/blog", BlogRouter);
  app.use("/api/ordercustom", OrderCustomRouter);
  app.use("/api/collection", CollectionRouter);
  app.use("/api/upload", UploadFileRouter);
};

module.exports = routes;
