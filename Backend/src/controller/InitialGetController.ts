import { Request, Response } from "express";

export class InitialGetController {
  async getInit(req: Request, res: Response): Promise<void> {
    try {
      const messageObj = {
        Message:
          "Bem vindo(a) a API do teste técnico Shopper! Segue abaixo o link da documentação dos endpoints:",

        LinkDocumentation: "Link",
      };
      res.status(200).send(messageObj);
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }
}
