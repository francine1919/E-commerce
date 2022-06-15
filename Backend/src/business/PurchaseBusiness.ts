import { Authenticator } from "../services/Authenticator";
import { ShoppingListDatabase } from "../data/ShoppingListDatabase";
import { PurchaseDatabase } from "../data/PurchaseDatabase";
import { ProductDatabase } from "../data/ProductDatabase";

const shoppingListDatabase = new ShoppingListDatabase();
const authenticator = new Authenticator();
const purchaseDatabase = new PurchaseDatabase();
const productDatabase = new ProductDatabase();

export class PurchaseBusiness {
  calculateTotal = async (token: string): Promise<any> => {
    //validating token
    if (!token) {
      throw new Error(
        "Esse endpoint requer um token que deve ser inserido no headers 'authorization'."
      );
    }
   
    //get user id through token
    const tokenInfo = authenticator.getTokenData(token);
    const id_user = tokenInfo.id;

    //getting products sums from databank
    const result = await shoppingListDatabase.getShoppingListSum(id_user);

    //calculating total
    let total: number = 0;
    const accumulatedTotal = result?.reduce((a: any, b: any) => {
      (total = a.sum + b.sum), 0;
      return total;
    });
    
    if (total === 0) {
      total = accumulatedTotal.sum;
    }
    
    //inserting total in databank
    await purchaseDatabase.addTotal(id_user, total);

    return total;
  };

  deacreseStockQty = async (token: string, id_prod: string): Promise<void> => {
    
    //validating token and product id
    if (!token) {
      throw new Error(
        "Esse endpoint requer um token que deve ser inserido no headers 'authorization'."
      );
    }
    if (!id_prod) {
      throw new Error("Por favor insira um id válido.");
    }

    //get user id through token
    const tokenInfo = authenticator.getTokenData(token);
    const id_user = tokenInfo.id;

    //update qty in stock
    await productDatabase.decreaseProductQuantityInStock(id_user, id_prod);


  };
  
}
