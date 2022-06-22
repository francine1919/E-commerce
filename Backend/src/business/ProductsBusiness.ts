import { ProductDatabase } from "../data/ProductDatabase";
import { Authenticator } from "../services/Authenticator";

const authenticator = new Authenticator();
const productsDatabase = new ProductDatabase();
export default class ProductBusiness {
  getAllProducts = async () => {
    const productsInStock = await productsDatabase.getCurrentStock();
    return productsInStock;
  };
  getProductById = async (token: string, id: string) => {


    //veryfying token
    if (!token) {
      throw new Error(
        "Esse endpoint requer um token que deve ser inserido no headers 'authorization'."
      );
    }
    if (!id) {
      throw new Error("Por favor digite um id válido.");
    }
    const product = await productsDatabase.getProductById(id);
    return product;
  };
  decreaseStockQty = async (
    token: string,
    id: string,
    qty_stock: number
  ): Promise<void> => {
    //validating token and product id
    if (!token) {
      throw new Error(
        "Esse endpoint requer um token que deve ser inserido no headers 'authorization'."
      );
    }
    if (!id) {
      throw new Error("Por favor insira um id válido.");
    }

    //verifying token
    const tokenInfo = authenticator.getTokenData(token);
    if (!tokenInfo) {
      throw new Error("Token inválido.");
    }
    //update quantity in stock
    await productsDatabase.decreaseStock(id, qty_stock);
  };
}
