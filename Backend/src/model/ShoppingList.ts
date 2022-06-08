export class ShoppingList {
  constructor(
    private user_id: string,
    private user_id_product: string,
    private prod_qtd: number
  ) {}

  getId() {
    return this.user_id;
  }

  getUserIdProduct() {
    return this.user_id_product;
  }
  static toShoppingListModel(list: any): ShoppingList {
    return new ShoppingList(list.user_id, list.user_id_product, list.prod_qtd);
  }
}

export interface ShoppingListInputDTO {
  user_id_product: string;
}
