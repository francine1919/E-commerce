import { Request, Response } from "express";
import { PurchaseBusiness } from "../business/PurchaseBusiness";
import { ShoppingCartInputDTO } from "../model/ShoppingCart";

const purchaseBusiness = new PurchaseBusiness();

export class PurchaseController {
  async createPurchase(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const input: ShoppingCartInputDTO = {
        cart_items: req.body.cart_items,
        total: req.body.total,
      };
      await purchaseBusiness.addPurchase(token, input);
      res.status(201).send("Obrigada por comprar com a gente!");
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
      res.status(500).send("Erro. Por favor tente novamente.");
    }
  }

  async getPurchase(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;

      const result = await purchaseBusiness.getPurchase(token);
      res.status(201).send(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
      res.status(500).send("Erro. Por favor tente novamente.");
    }
  }
}
