import express from "express";
import ProductController from "../controller/ProductsController";

export const productRouter = express.Router();
const productController = new ProductController();

//get all products
productRouter.get("/all", productController.getAllProducts);

//get product by Id
productRouter.get("/:id", productController.getProductById);

//put decrease qty_stock
productRouter.put("/decrease", productController.decreaseStockQty);
