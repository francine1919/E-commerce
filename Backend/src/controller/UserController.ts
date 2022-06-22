import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserInputDTO } from "../model/User";



export class UserController {
  async createUser(req: Request, res: Response) {
    const userBusiness = new UserBusiness();
    try {
      const input: UserInputDTO = {
        username: req.body.username,
        delivery_date: req.body.delivery_date,
      };

      const token = await userBusiness.createUser(input);

      res.status(201).send({
        message: "Logado, boas compras!",
        token: token,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
      res.status(500).send("Erro no signup");
    }
  }
}
