import { Product, Products } from "../model/Product";
import { BaseDatabase } from "./BaseDatabase";
import { ShoppingListDatabase } from "./ShoppingListDatabase";

const shoppingListDatabase = new ShoppingListDatabase();

export class ProductDatabase extends BaseDatabase {
  private static TABLE_NAME = "products";

  public async getCurrentStock(): Promise<Products[]> {
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

  public async decreaseProductQuantityInStock(
    user_id: string,
    user_id_product: string
  ): Promise<void> {
    try {
      //getting product from product database
      const products = await shoppingListDatabase.getProductInShoppingList(
        user_id,
        user_id_product
      );

      const qty_stock = await this.getProductById(user_id_product);

      //updating table
      await this.connection(ProductDatabase.TABLE_NAME)
        .update({ qty_stock: qty_stock.getQtyStock() - products.getProdQtd() })
        .from(ProductDatabase.TABLE_NAME)
        .where({ id: user_id_product });
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  }
}
