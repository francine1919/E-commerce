import { Product} from "../model/Product";
import { BaseDatabase } from "./BaseDatabase";


export class ProductDatabase extends BaseDatabase {
  private static TABLE_NAME = "products";

  public async getCurrentStock(): Promise<Product[]> {
    try {
      const productsInStock = await this.connection(ProductDatabase.TABLE_NAME)
        .select("*")
        .from(ProductDatabase.TABLE_NAME);
      const products = productsInStock.map((prod) =>
        Product.toProductModel(prod)
      );
      return products;
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  }

  public async getProductById(id: string): Promise<Product> {
    try {
      const product = await this.connection(ProductDatabase.TABLE_NAME)
        .select("*")
        .where({ id: id });
      return product[0] && Product.toProductModel(product[0]);
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  }

  public async getProductPriceById(id: string): Promise<number> {
    try {
      const productPrice = await this.connection(ProductDatabase.TABLE_NAME)
        .select("price")
        .where({ id: id });
      return productPrice[0].price;
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  }

  public async decreaseStock(id_prod: string, new_prod_qty_stock: number) {
    try {
      //updating product table
      await this.connection("products")
        .where({ id: id_prod })
        .update({ qty_stock: new_prod_qty_stock });
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  }
}
