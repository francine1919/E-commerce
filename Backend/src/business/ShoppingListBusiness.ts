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
    //checking if product exists on database
    const isProduct = await productDatabase.getProductById(
      input.user_id_product
    );

    //general validations
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

    //checking if product is already added on the shopping list
    const isProductInShoppingList =
      await shoppingListDatabase.getProductInShoppingList(
        id_user,
        input.user_id_product
      );

    //adding product to the list because the product is being added for the first time
    if (isProductInShoppingList === undefined) {
      await shoppingListDatabase.addProductsToShoppingList(
        id_user,
        input.user_id_product
      );
    }

    //increasing product quantity because the product is already added
    if (isProductInShoppingList) {
      await shoppingListDatabase.increaseProductQuantityInShoppingList(
        isProductInShoppingList.getProdQtd(),
        id_user,
        input.user_id_product
      );
    }
  };

  decreaseProductQuantityInShoppingList = async (
    input: ShoppingListInputDTO,
    token: string
  ): Promise<void> => {
    //checking if product exists on database
    const isProduct = await productDatabase.getProductById(
      input.user_id_product
    );

    // general validations
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

    //checking if product is in the shopping list
    const isProductInShoppingList =
      await shoppingListDatabase.getProductInShoppingList(
        id_user,
        input.user_id_product
      );

    if (isProductInShoppingList === undefined) {
      throw new Error("O produto não está no carrinho.");
    }

    //deleting product if quantity is less than 1
    if (isProductInShoppingList.getProdQtd() === 1) {
      await shoppingListDatabase.deleteProductFromShoppingListById(
        input.user_id_product
      );
      throw new Error("Produto deletado do banco de dados.");
    }

    //decreasing product quantity
    if (isProductInShoppingList) {
      await shoppingListDatabase.decreaseProductQuantityInShoppingList(
        isProductInShoppingList.getProdQtd(),
        id_user,
        input.user_id_product
      );
    }
  };

  deleteProductFromShoppingList = async (
    input: ShoppingListInputDTO,
    token: string
  ): Promise<void> => {
    //checking if product exists on database
    const isProduct = await productDatabase.getProductById(
      input.user_id_product
    );

    //general validations
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

    //checking if product is in the shopping list
    const isProductInShoppingList =
      await shoppingListDatabase.getProductInShoppingList(
        id_user,
        input.user_id_product
      );

    if (isProductInShoppingList === undefined) {
      throw new Error("O produto não está no carrinho.");
    }

    //deleting product from shopping list
    await shoppingListDatabase.deleteProductFromShoppingListById(
      input.user_id_product
    );
  };
}
