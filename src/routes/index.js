const UserRouter = require("./UserRouter");
const ProductRouter = require("./ProductRouter");
const OrderRouter = require("./OrderRouter");
const PaymentRouter = require("./PaymentRouter");
const BlogRouter = require("./BlogRouter");
const OrderCustomRouter = require("./OrderCustomRouter");
const CollectionRouter = require("./CollectionRouter");
const UploadFileRouter = require("./UploadFileRouter");
const ExpressRouter = require("./ExpressRouter");
const CategoryRouter = require("./CategoryRouter");
const SizeRouter = require("./SizeRouter");
const CardsRouter = require("./CardsRouter");
const TypeRouter = require("./TypeRouter");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/product", ProductRouter);
  app.use("/api/order", OrderRouter);
  app.use("/api/payment", PaymentRouter);
  app.use("/api/blog", BlogRouter);
  app.use("/api/ordercustom", OrderCustomRouter);
  app.use("/api/collection", CollectionRouter);
  app.use("/api/upload", UploadFileRouter);
  app.use("/api/express", ExpressRouter);
  app.use("/api/category", CategoryRouter);
  app.use("/api/size", SizeRouter);
  app.use("/api/cards", CardsRouter);
  app.use("/api/type", TypeRouter);
};

module.exports = routes;
