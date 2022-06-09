import { Product, Products } from "../model/Product";
import { BaseDatabase } from "./BaseDatabase";

export class ProductDatabase extends BaseDatabase {
  private static TABLE_NAME = "products";

  public getCurrentStock = async (): Promise<Products[]> => {
    try {
      const productsInStock = await this.connection(ProductDatabase.TABLE_NAME)
        .select("*")
        .from(ProductDatabase.TABLE_NAME);
      const products = productsInStock.map((prod) =>
        Product.toProductModelStock(prod)
      );
      return products;
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  };

  public getProductById = async (id: string): Promise<Product> => {
    try {
      const product = await this.connection(ProductDatabase.TABLE_NAME)
        .select("*")
        .where({ id: id });
      return product[0] && Product.toProductModel(product[0]);
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  };

  public getProductPriceById = async (id: string): Promise<number> => {
    try {
      const productPrice = await this.connection(ProductDatabase.TABLE_NAME)
        .select("price")
        .where({ id: id });
      return productPrice[0].price;
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  };
}
