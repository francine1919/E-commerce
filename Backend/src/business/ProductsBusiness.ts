import { ProductDatabase } from "../data/ProductDatabase";

export default class ProductBusiness {
  getAllProducts = async () => {
    const productsDatabase = new ProductDatabase();
    const productsInStock = await productsDatabase.getCurrentStock();
    return productsInStock;
  };
  getProductById = async (token: string, id: string) => {
    const productsDatabase = new ProductDatabase();

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
}
