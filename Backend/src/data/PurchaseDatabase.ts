import { BaseDatabase } from "./BaseDatabase";
import { ProductDatabase } from "./ProductDatabase";

export class PurchaseDatabase extends BaseDatabase {
  private static TABLE_NAME = "user_has_purchase";

  public async addTotal(user_id: string, total: number): Promise<void> {
    try {
      //inserting total
      await this.connection(PurchaseDatabase.TABLE_NAME)
        .insert({
          user_id,
          total: total,
        })
        .into(PurchaseDatabase.TABLE_NAME);
    } catch (err: any) {
      console.log(err.sqlMessage || err.message);
      throw new Error(err.sqlMessage || err.message);
    }
  }
}
