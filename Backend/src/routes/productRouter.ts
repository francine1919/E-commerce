import express from "express";
import ProductBusiness from "../business/ProductsBusiness";
import ProductController from "../controller/ProductsController";


export const productRouter = express.Router();
const productController = new ProductController();

//get all teams
productRouter.get("/all", productController.getAllProducts);


