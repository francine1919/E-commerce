import { Product } from "../model/Product";
import { BaseDatabase } from "./BaseDatabase";

export class ProductDatabase extends BaseDatabase {
  private static TABLE_NAME = "products";

  public getCurrentStock = async () => {
    try {
      const productsInStock = await this.connection(ProductDatabase.TABLE_NAME)
        .select("*")
        .from(ProductDatabase.TABLE_NAME);
      const prods = productsInStock.map((prod) =>
        Product.toProductModelStock(prod)
      );

      return prods;
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  };

  public getProductById = async (id: string) => {
    const product = await this.connection(ProductDatabase.TABLE_NAME)
      .select("*")
      .where({ id: id });
    return product[0] && Product.toProductModel(product[0]);
  };

  public getProductPriceById = async (id: string) => {
    const productPrice = await this.connection(ProductDatabase.TABLE_NAME)
      .select("price")
      .where({ id: id });
      console.log(productPrice[0])
    return productPrice[0].price;
  };
}
