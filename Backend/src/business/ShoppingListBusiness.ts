import { Authenticator } from "../services/Authenticator";
import { ShoppingListInputDTO } from "../model/ShoppingList";
import { ShoppingListDatabase } from "../data/ShoppingListDatabase";
import { ProductDatabase } from "../data/ProductDatabase";

const shoppingListDatabase = new ShoppingListDatabase();
const productDatabase = new ProductDatabase();
const authenticator = new Authenticator();

export class ShoppingListBusiness {
  addProdToShoppingList = async (
    input: ShoppingListInputDTO,
    token: string
  ): Promise<void> => {
    //validating product id
    const isProduct = await productDatabase.getProductById(
      input.user_id_product
    );

    //validations
    if (!token) {
      throw new Error(
        "Esse endpoint requer um token que deve ser inserido no headers 'authorization'."
      );
    }
    if (!input.user_id_product) {
      throw new Error(
        "Seu carrinho está vazio, favor inserir produtos no carrinho."
      );
    }
    if (isProduct === undefined) {
      throw new Error("Produto não cadastrado no banco de dados.");
    }

    //get user id through token
    const tokenInfo = authenticator.getTokenData(token);
    const id_user = tokenInfo.id;

    const isProductInShoppingList =
      await shoppingListDatabase.getProductInShoppingList(
        id_user,
        input.user_id_product
      );

    if (isProductInShoppingList) {
      // getting product price,if exists
      const priceProduct: number | undefined =
        await productDatabase.getProductPriceById(input.user_id_product);
      //changing quantity
      await shoppingListDatabase.increaseProductQuantityInShoppingList(
        isProductInShoppingList.getProdQtd(),
        id_user,
        input.user_id_product,
        priceProduct!!
      );
    }

    if (isProductInShoppingList === undefined) {
      // getting product price,if exists
      const priceProduct: number | undefined =
        await productDatabase.getProductPriceById(input.user_id_product);

      //creating list
      await shoppingListDatabase.addProductsToShoppingList(
        id_user,
        input.user_id_product,
        1,
        priceProduct!!
      );
    }
  };

  decreaseProductQuantityInShoppingList = async (
    input: ShoppingListInputDTO,
    token: string
  ): Promise<void> => {
    //validating product id
    const isProduct = await productDatabase.getProductById(
      input.user_id_product
    );

    //validations
    if (!token) {
      throw new Error(
        "Esse endpoint requer um token que deve ser inserido no headers 'authorization'."
      );
    }
    if (!input.user_id_product) {
      throw new Error(
        "Seu carrinho está vazio, favor inserir produtos no carrinho."
      );
    }
    if (isProduct === undefined) {
      throw new Error("Produto não cadastrado no banco de dados.");
    }

    //get user id through token
    const tokenInfo = authenticator.getTokenData(token);
    const id_user = tokenInfo.id;

    const isProductInShoppingList =
      await shoppingListDatabase.getProductInShoppingList(
        id_user,
        input.user_id_product
      );
    if (isProductInShoppingList.getProdQtd() <= 0) {
      await shoppingListDatabase.deleteProductFromShoppingListById(
        input.user_id_product
      );
      throw new Error("Produto deletado do banco de dados.");
    }

    if (isProductInShoppingList) {
      // getting product price,if exists
      const priceProduct: number | undefined =
        await productDatabase.getProductPriceById(input.user_id_product);

      //changing quantity
      await shoppingListDatabase.decreaseProductQuantityInShoppingList(
        isProductInShoppingList.getProdQtd(),
        id_user,
        input.user_id_product,
        priceProduct!!
      );
    }

    if (isProductInShoppingList === undefined) {
      throw new Error("O produto não está no carrinho.");
    }
  };

  deleteProductFromShoppingList = async (
    input: ShoppingListInputDTO,
    token: string
  ): Promise<void> => {
    //validating product id
    const isProduct = await productDatabase.getProductById(
      input.user_id_product
    );

    //validations
    if (!token) {
      throw new Error(
        "Esse endpoint requer um token que deve ser inserido no headers 'authorization'."
      );
    }
    if (!input.user_id_product) {
      throw new Error(
        "Seu carrinho está vazio, favor inserir produtos no carrinho."
      );
    }
    if (isProduct === undefined) {
      throw new Error("Produto não cadastrado no banco de dados.");
    }

    //get user id through token
    const tokenInfo = authenticator.getTokenData(token);
    const id_user = tokenInfo.id;

    const isProductInShoppingList =
      await shoppingListDatabase.getProductInShoppingList(
        id_user,
        input.user_id_product
      );
    //validating product in shopping list
    if (isProductInShoppingList === undefined) {
      throw new Error("O produto não está no carrinho.");
    }
    await shoppingListDatabase.deleteProductFromShoppingListById(
      input.user_id_product
    );
  };
}
