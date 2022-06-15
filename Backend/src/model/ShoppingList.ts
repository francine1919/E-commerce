export class ShoppingList {
  constructor(
    private user_id: string,
    private user_id_product: string,
    private prod_qtd: number,
    private sum: number,
    private total: number
  ) {}

  getId() {
    return this.user_id;
  }

  getUserIdProduct() {
    return this.user_id_product;
  }

  getProdQtd() {
    return this.prod_qtd;
  }

  getTotal() {
    return this.total;
  }
  getSum() {
    return this.sum;
  }
  static toShoppingListModel(list: any): ShoppingList {
    return new ShoppingList(
      list.user_id,
      list.user_id_product,
      list.prod_qtd,
      list.sum,
      list.total
    );
  }
}

export interface ShoppingListInputDTO {
  user_id_product: string;
}
