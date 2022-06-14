import express from "express";
import ProductBusiness from "../business/ProductsBusiness";
import ProductController from "../controller/ProductsController";

export const productRouter = express.Router();
const productController = new ProductController();

//get all products
productRouter.get("/all", productController.getAllProducts);

//get product by Id
productRouter.get("/:id", productController.getProductById);
