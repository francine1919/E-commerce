import { Request, Response } from "express";

export class InitialGetController {
  async getInit(req: Request, res: Response): Promise<void> {
    try {
      const messageObj = {
        Message: "Bem vindo(a) a API do teste técnico Shopper! 🛍️",
        Author: "Este teste foi feito por Francine Lima  👩‍💻",
        Github: `Github: https://github.com/francine1919   🔗 `,
        Documentation_link: `Segue o link da documentação dos endpoints:"Link" 📋 `,
      };
      res.status(200).send(messageObj);
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }
}
