import { ShoppingList } from "../model/ShoppingList";
import { BaseDatabase } from "./BaseDatabase";

export class ShoppingListDatabase extends BaseDatabase {
  private static TABLE_NAME = "user_has_products";

  public async addProductsToShoppingList(
    user_id: string,
    user_id_product: string,
    prod_qtd: number,
    total: number
  ): Promise<void> {
    try {
      await this.connection(ShoppingListDatabase.TABLE_NAME)
        .insert({
          user_id,
          user_id_product,
          prod_qtd,
          total,
        })
        .into(ShoppingListDatabase.TABLE_NAME);
    } catch (err: any) {
      console.log(err.sqlMessage || err.message);
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
  public async increaseProductQuantityInShoppingList(
    prod_qtd: number,
    user_id: string,
    user_id_product: string,
    total: number
  ): Promise<void> {
    try {
      await this.connection(ShoppingListDatabase.TABLE_NAME)
        .update({ prod_qtd: prod_qtd + 1, total: total + total * prod_qtd })
        .from(ShoppingListDatabase.TABLE_NAME)
        .where({ user_id: user_id, user_id_product: user_id_product });
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  }
  public async decreaseProductQuantityInShoppingList(
    prod_qtd: number,
    user_id: string,
    user_id_product: string,
    total: number
  ): Promise<void> {
    try {
      await this.connection(ShoppingListDatabase.TABLE_NAME)
        .update({ prod_qtd: prod_qtd - 1, total: total + total * prod_qtd })
        .from(ShoppingListDatabase.TABLE_NAME)
        .where({ user_id: user_id, user_id_product: user_id_product });
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
  //   public async getAllTeams(): Promise<Team[]> {
  //     try {
  //       const allTeamsData = await this.connection(
  //         TeamDatabase.TABLE_NAME
  //       ).select("*");
  //       return allTeamsData.map((team) => Team.toTeamModel(team));
  //     } catch (err: any) {
  //       throw new Error(err.sqlMessage || err.message);
  //     }
  //   }
}
