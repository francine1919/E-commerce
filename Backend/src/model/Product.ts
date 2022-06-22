export class Product {
  constructor(
    private id: string,
    private name: string,
    private price: number,
    private qty_stock: number
  ) {}

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }
  getPrice() {
    return this.price;
  }
  getQtyStock() {
    return this.qty_stock;
  }
  static toProductModel(prod: any): Product {
    return new Product(prod.id, prod.name, prod.price, prod.qty_stock);
  }
  static toProductModelStock(prod: any): Products {
    return { name: prod.name, qty_stock: prod.qty_stock };
  }
}
export interface Products {
  name: string;
  qty_stock: number;
}

