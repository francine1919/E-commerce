import { Product } from "../model/Product";
import { BaseDatabase } from "./BaseDatabase";

export class ProductDatabase extends BaseDatabase {
  private static TABLE_NAME = "products";

  getCurrentStock = async (): Promise<Product[]> => {
    try {
      const productsInStock = await this.connection(ProductDatabase.TABLE_NAME)
        .select("*")
        .from(ProductDatabase.TABLE_NAME);
      

        const prods = productsInStock.map((prod) =>
          Product.toProductModel(prod)
        );
       
        return prods
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  };
}
