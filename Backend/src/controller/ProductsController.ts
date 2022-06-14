import { Request, Response } from "express";
import ProductBusiness from "../business/ProductsBusiness";

export default class ProductController {
  getAllProducts = async (req: Request, res: Response): Promise<any> => {
    try {
      const productsBusiness = new ProductBusiness();

      const productsData = await productsBusiness.getAllProducts();

      res.status(200).send(productsData);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }

      res.status(500).send("Erro tente novamente.");
    }
  };
  getProductById = async (req: Request, res: Response): Promise<any> => {
    try {
      const productsBusiness = new ProductBusiness();
      const token=req.headers.authorization as string
      const id=req.params.id
      const productsData = await productsBusiness.getProductById(token,id);

      res.status(200).send(productsData);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message);
      }

      res.status(500).send("Erro tente novamente.");
    }
  };
}
