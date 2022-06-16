import { ShoppingList } from "../model/ShoppingList";
import { BaseDatabase } from "./BaseDatabase";
import { ProductDatabase } from "./ProductDatabase";

export class ShoppingListDatabase extends BaseDatabase {
  private static TABLE_NAME = "user_has_products";
  public async addProductsToShoppingList(
    user_id: string,
    user_id_product: string
    // prod_qtd: number
  ): Promise<void> {
    try {
      const productsData = new ProductDatabase();
      //getting price from product database
      const price = await productsData.getProductPriceById(user_id_product);
      //inserting product or updating
      await this.connection.raw(`
       INSERT INTO user_has_products (user_id, user_id_product, sum, prod_qtd ) VALUES (
        "${user_id}",
        "${user_id_product}",
        ${price},
        ${1}
        )
       ON DUPLICATE KEY UPDATE
       prod_qtd = prod_qtd + 1,
       sum = ${price} * prod_qtd ;
       `);
    } catch (err: any) {
      console.log(err.sqlMessage || err.message);
      throw new Error(err.sqlMessage || err.message);
    }
  }

  public async increaseProductQuantityInShoppingList(
    prod_qtd: number,
    user_id: string,
    user_id_product: string
  ): Promise<void> {
    try {
      const productsData = new ProductDatabase();
      //getting price from product database
      const price = await productsData.getProductPriceById(user_id_product);

      //updating table when product quantity is increased
      await this.connection(ShoppingListDatabase.TABLE_NAME)
        .update({ prod_qtd: prod_qtd + 1, sum: price + price * prod_qtd })
        .from(ShoppingListDatabase.TABLE_NAME)
        .where({ user_id: user_id, user_id_product: user_id_product });
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  }

  public async decreaseProductQuantityInShoppingList(
    prod_qtd: number,
    user_id: string,
    user_id_product: string
  ): Promise<void> {
    try {
      const productsData = new ProductDatabase();
      //getting price from product database
      const price = await productsData.getProductPriceById(user_id_product);

      //updating table when product quantity is decreased
      await this.connection(ShoppingListDatabase.TABLE_NAME)
        .update({ prod_qtd: prod_qtd - 1, sum: price * prod_qtd - price })
        .from(ShoppingListDatabase.TABLE_NAME)
        .where({ user_id: user_id, user_id_product: user_id_product });
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  }

  public async getProductInShoppingList(
    user_id: string,
    user_id_product: string
  ): Promise<ShoppingList> {
    try {
      const result = await this.connection(ShoppingListDatabase.TABLE_NAME)
        .select("*")
        .from(ShoppingListDatabase.TABLE_NAME)
        .where({ user_id: user_id, user_id_product: user_id_product });
      return result[0] && ShoppingList.toShoppingListModel(result[0]);
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  }

  public async deleteProductFromShoppingListById(
    user_id_product: string
  ): Promise<void> {
    try {
      await this.connection(ShoppingListDatabase.TABLE_NAME)
        .delete()
        .from(ShoppingListDatabase.TABLE_NAME)
        .where({ user_id_product: user_id_product });
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  }

  public async getShoppingList(user_id: string): Promise<ShoppingList[]> {
    // console.log(user_id)
    try {
      const result = await this.connection(ShoppingListDatabase.TABLE_NAME)
        .select("*")
        .from(ShoppingListDatabase.TABLE_NAME)
        .where({ user_id: user_id });
      // console.log(result)
      return result;
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  }
  public async getShoppingListSum(user_id: string): Promise<any> {
    try {
      const result = await this.connection(ShoppingListDatabase.TABLE_NAME)
        .select("sum")
        .from(ShoppingListDatabase.TABLE_NAME)
        .where({ user_id: user_id });

      return result;
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  }
 //     await this.connection(ShoppingListDatabase.TABLE_NAME)
   // public async insertingTotal(user_id: string, total: number): Promise<void> {
  //   try {
  //       .insert({ total: total })
  //       .into(ShoppingListDatabase.TABLE_NAME)
  //       .where({ user_id: user_id });
  //   } catch (err: any) {
  //     throw new Error(err.sqlMessage || err.message);
  //   }
  // }
}
