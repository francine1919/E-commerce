import { ShoppingList } from "../model/ShoppingList";
import { BaseDatabase } from "./BaseDatabase";
import { ProductDatabase } from "./ProductDatabase";

export class ShoppingListDatabase extends BaseDatabase {
  private static TABLE_NAME = "user_has_products";
  private static productDatabase = new ProductDatabase();

  public async addProductsToShoppingList(
    user_id: string,
    user_id_product: string
  ): Promise<void> {
    try {
      //getting price from product database
      const price =
        await ShoppingListDatabase.productDatabase.getProductPriceById(
          user_id_product
        );

      //inserting a new product to the shopping list
      await this.connection(ShoppingListDatabase.TABLE_NAME)
        .insert({
          user_id,
          user_id_product,
          sum: price,
        })
        .into(ShoppingListDatabase.TABLE_NAME);
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
      //getting price from product database
      const price =
        await ShoppingListDatabase.productDatabase.getProductPriceById(
          user_id_product
        );

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
      //getting price from product database
      const price =
        await ShoppingListDatabase.productDatabase.getProductPriceById(
          user_id_product
        );

      //updating table when product quantity is decreased
      await this.connection(ShoppingListDatabase.TABLE_NAME)
        .update({ prod_qtd: prod_qtd - 1, sum: price * prod_qtd - price })
        .from(ShoppingListDatabase.TABLE_NAME)
        .where({ user_id: user_id, user_id_product: user_id_product });
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  }
  // public async calculateTotal(user_id: string): Promise<any> {
  //   try {
  //     const totalSum = await this.connection(ShoppingListDatabase.TABLE_NAME)
  //       .sum("sum")
  //       .where({ user_id: user_id });
  //     // await this.connection(ShoppingListDatabase.TABLE_NAME).insert({
  //     //   total: totalSum,
  //     // });
  //     console.log(totalSum[0]);
  //     return totalSum[0];
  //   } catch (err: any) {
  //     throw new Error(err.sqlMessage || err.message);
  //   }
  // }

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

  public async getShoppingList(user_id: string): Promise<ShoppingList> {
    try {
      const result = await this.connection(ShoppingListDatabase.TABLE_NAME)
        .select("*")
        .from(ShoppingListDatabase.TABLE_NAME)
        .where({ user_id: user_id });
      return result[0] && ShoppingList.toShoppingListModel(result[0]);
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  }
}
