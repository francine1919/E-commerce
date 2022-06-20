import { BaseDatabase } from "./BaseDatabase";
import { ProductDatabase } from "./ProductDatabase";

const productDatabase = new ProductDatabase();
export class PurchaseDatabase extends BaseDatabase {
  private static TABLE_NAME = "user_has_purchase";

  public async addPurchase(
    user_id: string,
    total: number,
    cart: string[]
  ): Promise<void> {
    try {
      // inserting total and cart items
      await this.connection(PurchaseDatabase.TABLE_NAME)
        .insert({
          user_id,
          cart_items: cart,
          total: total,
        })
        .into(PurchaseDatabase.TABLE_NAME);
      // await this.connection("products").update({ qty_stock: qty_stock }).where({})
    } catch (err: any) {
      console.log(err.sqlMessage || err.message);
      throw new Error(err.sqlMessage || err.message);
    }
  }

  public async getPurchases(user_id: string) {
    try {
      // inserting total and cart items
      const result = await this.connection(PurchaseDatabase.TABLE_NAME)
        .select("cart_items")
        .where({ user_id: user_id });
      // await this.connection("products").update({ qty_stock: qty_stock }).where({})
      const shoppingList = result.map((prod) => prod.cart_items);
      const test= result.find((prod)=>prod.cart_items);
      console.log(shoppingList);
       return result;
    } catch (err: any) {
      console.log(err.sqlMessage || err.message);
      throw new Error(err.sqlMessage || err.message);
    }
  }
}
