export class ShoppingCart {
  constructor(
    private user_id: string,
    private cart_items: string[],
    private total: number
  ) {}

   static toShoppingCartModel(list: any): ShoppingCart {
    return new ShoppingCart(
      list.user_id,
      list.cart_items,
      list.total
    );
  }
}

export interface ShoppingCartInputDTO {
 cart_items: string[];
 total:number
}
