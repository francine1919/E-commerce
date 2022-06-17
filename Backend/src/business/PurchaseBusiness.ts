import { Authenticator } from "../services/Authenticator";
// import { ShoppingListDatabase } from "../data/ShoppingListDatabase";
import { PurchaseDatabase } from "../data/PurchaseDatabase";
import { ProductDatabase } from "../data/ProductDatabase";

// const shoppingListDatabase = new ShoppingListDatabase();
const authenticator = new Authenticator();
const purchaseDatabase = new PurchaseDatabase();
const productDatabase = new ProductDatabase();

export class PurchaseBusiness {
  addPurchase = async (token: string, total: number, cart: []) => {
    //validating token
    if (!token) {
      throw new Error(
        "Esse endpoint requer um token que deve ser inserido no headers 'authorization'."
      );
    }
    //get user id through token
    const tokenInfo = authenticator.getTokenData(token);
    const id_user = tokenInfo.id;

    await purchaseDatabase.addPurchase(id_user, total, cart);
  };


  // decreaseStockQty = async (token: string, id_prod: string): Promise<void> => {
  //   //validating token and product id
  //   if (!token) {
  //     throw new Error(
  //       "Esse endpoint requer um token que deve ser inserido no headers 'authorization'."
  //     );
  //   }
  //   if (!id_prod) {
  //     throw new Error("Por favor insira um id válido.");
  //   }

  //   //get user id through token
  //   const tokenInfo = authenticator.getTokenData(token);
  //   const id_user = tokenInfo.id;

  //   //update qty in stock
  //   await productDatabase.decreaseProductQuantityInStock(id_user, id_prod);
  // };
}
