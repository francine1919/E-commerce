import { Request, Response } from "express";
import { ShoppingListBusiness } from "../business/ShoppingListBusiness";
import { ShoppingListInputDTO } from "../model/ShoppingList";

const shoppingListBusiness = new ShoppingListBusiness();

export class ShoppingListController {
  async addProductsToShoppingList(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const input: ShoppingListInputDTO = {
        user_id_product: req.body.user_id_product,
      };

      await shoppingListBusiness.addProdToShoppingList(input, token);

      res.status(200).send("Adicionado com sucesso.");
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
      res
        .status(500)
        .send("Erro ao criar lista de compras. Por favor tente novamente.");
    }
  }
  async decreaseProductQuantityFromShoppingList(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const input: ShoppingListInputDTO = {
        user_id_product: req.body.user_id_product,
      };

      await shoppingListBusiness.decreaseProductQuantityInShoppingList(
        input,
        token
      );

      res.status(200).send("Quantidade decrescida de 1 unidade com sucesso.");
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
      res
        .status(500)
        .send("Erro ao criar lista de compras. Por favor tente novamente.");
    }
  }
  //   async login(req: Request, res: Response) {
  //     try {
  //       const input: LoginInputDTO = {
  //         email: req.body.email,
  //         password: req.body.password,
  //       };

  //       const token = await responsibleBusiness.login(input);

  //       res.status(200).send({ message: "Usuário logado", token: token });
  //     } catch (error: any) {
  //       res.status(400).send({ error: error.message });
  //     }
  //   }

  //   async editRole(req: Request, res: Response) {
  //     try {
  //       const tokenHeaders = req.headers.authorization as string;

  //       const input: RoleInputDTO = {
  //         id: req.body.id,
  //         role: req.body.role,
  //       };

  //       const role = await responsibleBusiness.editRole(input, tokenHeaders);

  //       res
  //         .status(200)
  //         .send({ message: "Role alterado com sucesso!", token: role });
  //     } catch (error: any) {
  //       res.status(400).send({ error: error.message });
  //     }
  //   }

  //   async getAllResponsibles(req: Request, res: Response): Promise<void> {
  //     try {
  //       const token_headers = req.headers.authorization as string;

  //       const responsibleBusiness = new ResponsibleBusiness();
  //       const responsible = await responsibleBusiness.getAllResponsibles(
  //         token_headers
  //       );
  //       res.status(200).send(responsible);
  //     } catch (error: any) {
  //       res.status(400).send({ error: error.message });
  //     }
  //   }
}
