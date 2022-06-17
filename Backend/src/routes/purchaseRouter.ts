import express from "express";
import { PurchaseController } from "../controller/PurchaseController";

export const purchaseRouter = express.Router();
const purchaseController = new PurchaseController();


//get purchase
purchaseRouter.get("/all",purchaseController.getPurchase)

//create purchase
purchaseRouter.post("/final", purchaseController.createPurchase);
