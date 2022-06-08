import { Authenticator } from "../services/Authenticator";
import { ShoppingListInputDTO } from "../model/ShoppingList";
import { ShoppingListDatabase } from "../data/ShoppingListDatabase";

const shoppingListDatabase = new ShoppingListDatabase();
const authenticator = new Authenticator();

export class ShoppingListBusiness {
  addProdToShoppingList = async (
    input: ShoppingListInputDTO,
    token: string
  ): Promise<void> => {
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

    //get user id through token
    const tokenInfo = authenticator.getTokenData(token);
    const id_user = tokenInfo.id;

    const isProductInShoppingList =
      await shoppingListDatabase.getProductInShoppingList(
        id_user,
        input.user_id_product
      );

    if (isProductInShoppingList) {
      //changing quantity
      await shoppingListDatabase.increaseProductQuantityInShoppingList(
        isProductInShoppingList.prod_qtd,
        id_user,
        input.user_id_product
      );
    }

    if (isProductInShoppingList === undefined) {
      //creating list
      await shoppingListDatabase.addProductsToShoppingList(
        id_user,
        input.user_id_product
      );
    }
  };

  decreaseProductQuantityInShoppingList = async (
    input: ShoppingListInputDTO,
    token: string
  ): Promise<void> => {
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

    //get user id through token
    const tokenInfo = authenticator.getTokenData(token);
    const id_user = tokenInfo.id;

    const isProductInShoppingList =
      await shoppingListDatabase.getProductInShoppingList(
        id_user,
        input.user_id_product
      );
    if ((isProductInShoppingList.prod_qtd = 0)) {
      throw new Error("Produto removido do banco de dados.");
    }

    if (isProductInShoppingList) {
      //changing quantity
      await shoppingListDatabase.decreaseProductQuantityInShoppingList(
        isProductInShoppingList.prod_qtd,
        id_user,
        input.user_id_product
      );
    }

    if (isProductInShoppingList === undefined) {
      throw new Error("O produto não está no carrinho.");
    }
  };
}
