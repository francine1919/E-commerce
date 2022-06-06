import { ProductDatabase } from "../data/ProductDatabase";
import { Product } from "../model/Product";

export default class ProductBusiness {
  getAllProducts = async ():Promise<Product[]> => {
    const productsDatabase = new ProductDatabase();
    const productsInStock = await productsDatabase.getCurrentStock();
    return productsInStock;
  };
}
