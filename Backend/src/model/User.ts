export class User {
  constructor(
    private id: string,
    private username: string,
    private delivery_date: Date | string
  ) {}

  getId() {
    return this.id;
  }

  getName() {
    return this.username;
  }
  getPrice() {
    return this.delivery_date;
  }

  static toUserModel(user: any): User {
    return new User(user.id, user.username, user.delivery_date);
  }
}
export interface UserInputDTO {
  username: string;
  delivery_date: Date | string;
}
