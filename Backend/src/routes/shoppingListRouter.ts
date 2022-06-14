import express from "express";
import { ShoppingListController } from "../controller/ShoppingListController";

export const shoppingListRouter = express.Router();
const shoppingListController = new ShoppingListController();

// //get total
// shoppingListRouter.get("/total", shoppingListController.getTotal);

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

//delete product from shopping list
shoppingListRouter.delete(
  "/delete",
  shoppingListController.deleteProductFromShoppingList
);
