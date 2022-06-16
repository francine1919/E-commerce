import { Request, Response } from "express";
import { PurchaseBusiness } from "../business/PurchaseBusiness";

const purchaseBusiness = new PurchaseBusiness();

export class PurchaseController {
  async addPurchase(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const total = await purchaseBusiness.calculateTotal(token);

      res.status(200).send(total);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
      res.status(500).send("Erro. Por favor tente novamente.");
    }
  }
  async decreaseStockQty(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const id_prod = req.body.id_prod;
      await purchaseBusiness.decreaseStockQty(token, id_prod);

      res.status(200).send("Done!");
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
      res.status(500).send("Erro. Por favor tente novamente.");
    }
  }
}
