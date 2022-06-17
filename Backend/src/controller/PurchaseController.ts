import { Request, Response } from "express";
import { PurchaseBusiness } from "../business/PurchaseBusiness";

const purchaseBusiness = new PurchaseBusiness();

export class PurchaseController {
  async createPurchase(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const total = req.body.total;
      const cart_items = req.body.cart_items;
      await purchaseBusiness.addPurchase(token, total, cart_items);
      res.status(201).send("Obrigada por comprar com a gente!");
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
      res.status(500).send("Erro. Por favor tente novamente.");
    }
  }

  async getPurchase(req:Request, res:Response){
 try {
   const token = req.headers.authorization as string;
   
   const result=await purchaseBusiness.getPurchase(token);
   res.status(201).send(result);
 } catch (error) {
   if (error instanceof Error) {
     return res.status(400).send(error.message);
   }
   res.status(500).send("Erro. Por favor tente novamente.");
 }

  }
  // async decreaseStockQty(req: Request, res: Response) {
  //   try {
  //     const token = req.headers.authorization as string;
  //     const id_prod = req.body.id_prod;
  //     await purchaseBusiness.decreaseStockQty(token, id_prod);

  //     res.status(200).send("Done!");
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       return res.status(400).send(error.message);
  //     }
  //     res.status(500).send("Erro. Por favor tente novamente.");
  //   }
  // }
}
