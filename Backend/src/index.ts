import dotenv from "dotenv";
import { AddressInfo } from "net";
import express from "express";
import cors from "cors";
import { initRouter } from "./routes/initRouter";
import { productRouter } from "./routes/productRouter";
import { userRouter } from "./routes/userRouter";
import { shoppingListRouter } from "./routes/shoppingListRouter";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/stock", productRouter);
app.use("", initRouter);
app.use("/user", userRouter);
app.use("/shopping", shoppingListRouter);

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in ${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
//
