import { BaseDatabase } from "./BaseDatabase";

const printError = (error: any) => {
  console.log(error.sqlMessage || error.message);
};

export class CreateTables extends BaseDatabase {
  createTables = () =>
    this.connection
      .raw(
        `
    CREATE TABLE IF NOT EXISTS user(
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    delivery_date DATE NOT NULL
);

    CREATE TABLE IF NOT EXISTS products(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL,
    qty_stock INT NOT NULL
);
    CREATE TABLE IF NOT EXISTS user_has_purchase(
    user_id VARCHAR(255),
   	FOREIGN KEY (user_id) REFERENCES user(id),
    cart_items TEXT NOT NULL,
	  total FLOAT DEFAULT 0
);

   `
      )
      .then(() => {
        console.log("Tables created successfully!!");
      })
      .catch(printError);

  closeConnection = () => {
    this.connection.destroy();
  };
}
const migrations = new CreateTables();

migrations.createTables().finally(migrations.closeConnection);
