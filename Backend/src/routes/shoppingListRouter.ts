import express from "express";
import { ShoppingListController } from "../controller/ShoppingListController";

export const shoppingListRouter = express.Router();
const shoppingListController = new ShoppingListController();

//create and add products to shopping list
shoppingListRouter.post(
  "/add",
  shoppingListController.addProductsToShoppingList
);

//decrease amount by one in shopping list
shoppingListRouter.put(
  "/decrease",
  shoppingListController.decreaseProductQuantityFromShoppingList
);
