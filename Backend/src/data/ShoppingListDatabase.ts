import { ShoppingList } from "../model/ShoppingList";
import { BaseDatabase } from "./BaseDatabase";

export class ShoppingListDatabase extends BaseDatabase {
  private static TABLE_NAME = "user_has_products";

  public async addProductsToShoppingList(
    user_id: string,
    user_id_product: string
  ): Promise<void> {
    try {
      await this.connection(ShoppingListDatabase.TABLE_NAME)
        .insert({
          user_id,
          user_id_product,
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
  ) {
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
    user_id_product: string
  ): Promise<void> {
    try {
      await this.connection(ShoppingListDatabase.TABLE_NAME)
        .update({ prod_qtd: prod_qtd + 1 })
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
      await this.connection(ShoppingListDatabase.TABLE_NAME)
        .update({ prod_qtd: prod_qtd - 1 })
        .from(ShoppingListDatabase.TABLE_NAME)
        .where({ user_id: user_id, user_id_product: user_id_product });
    } catch (err: any) {
      throw new Error(err.sqlMessage || err.message);
    }
  }
  //   public async getTeamByName(name: string) {
  //     try {
  //       const result = await this.connection(TeamDatabase.TABLE_NAME)
  //         .select("*")
  //         .from(TeamDatabase.TABLE_NAME)
  //         .where({ team_name: name });
  //       return result[0] && Team.toTeamModel(result[0]);
  //     } catch (err: any) {
  //       throw new Error(err.sqlMessage || err.message);
  //     }
  //   }
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
