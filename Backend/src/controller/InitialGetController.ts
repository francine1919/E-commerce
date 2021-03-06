import { Request, Response } from "express";

export class InitialGetController {
  async getInit(req: Request, res: Response): Promise<void> {
    try {
      const messageObj = {
        Message: "Bem vindo(a) a API do teste tΓ©cnico Shopper! ποΈ",
        Author: "Este teste foi feito por Francine Lima  π©βπ»",
        Github: `Github: https://github.com/francine1919   π `,
        Documentation_link: `https://documenter.getpostman.com/view/19296644/UzBnrmj6#19221d86-e68d-4fd0-9b86-e25774725e9a π `,
      };
      res.status(200).send(messageObj);
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }
}
