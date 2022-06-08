import { ProductDatabase } from "../data/ProductDatabase";

export default class ProductBusiness {
  getAllProducts = async () => {
    const productsDatabase = new ProductDatabase();
    const productsInStock = await productsDatabase.getCurrentStock();
    return productsInStock;
  };
}
