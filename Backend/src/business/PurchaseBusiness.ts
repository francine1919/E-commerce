import { Authenticator } from "../services/Authenticator";
import { PurchaseDatabase } from "../data/PurchaseDatabase";
import { ShoppingCartInputDTO } from "../model/ShoppingCart";

const authenticator = new Authenticator();
const purchaseDatabase = new PurchaseDatabase();

export class PurchaseBusiness {
  addPurchase = async (token: string, input: ShoppingCartInputDTO) => {
    //validating token
    if (!token) {
      throw new Error(
        "Esse endpoint requer um token que deve ser inserido no headers 'authorization'."
      );
    }
    //get user id through token
    const tokenInfo = authenticator.getTokenData(token);
    const id_user = tokenInfo.id;

    await purchaseDatabase.addPurchase(id_user, input.total, input.cart_items);
  };
  getPurchase = async (token: string): Promise<any> => {
    //validating token
    if (!token) {
      throw new Error(
        "Esse endpoint requer um token que deve ser inserido no headers 'authorization'."
      );
    }
    //get user id through token
    const tokenInfo = authenticator.getTokenData(token);
    const id_user = tokenInfo.id;

    const result = await purchaseDatabase.getPurchases(id_user);
    return result;
  };

}
