import express from "express";
import { PurchaseController } from "../controller/PurchaseController";

export const purchaseRouter = express.Router();
const purchaseController = new PurchaseController();

//create purchase
purchaseRouter.get("/total", purchaseController.addPurchase);
