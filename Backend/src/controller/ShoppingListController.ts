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
      res.status(500).send("Erro, por favor tente novamente.");
    }
  }
  async deleteProductFromShoppingList(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const input: ShoppingListInputDTO = {
        user_id_product: req.body.user_id_product,
      };

      await shoppingListBusiness.deleteProductFromShoppingList(input, token);

      res.status(200).send("Deletado com sucesso.");
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
      res.status(500).send("Erro, por favor tente novamente.");
    }
  }

  getTotal = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;
      const total = await shoppingListBusiness.getTotal(token);
      res.status(200).send({ total: total });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
      res.status(500).send("Erro, por favor tente novamente.");
    }
  };
  async getShoppingList(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      // console.log(token)
      const shoppingList = await shoppingListBusiness.getShoppingList(token);

      res.status(200).send(shoppingList);
    } catch (error: any) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }
      res.status(500).send("Erro, por favor tente novamente.");
    }
  }
}
