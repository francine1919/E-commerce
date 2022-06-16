import React, { useContext } from "react";
import Header from "../../Components/Header/Header";
import { GlobalContext } from "../../Global/GlobalContext/GlobalContext";
import { useGet } from "../../Hooks/useGet";
import { useProtectedPage } from "../../Hooks/useProtectedPage";
import { addPurchase } from "../../Services/services";
import ShoppingCart from "./ShoppingCart";

export default function CartPage() {
  useProtectedPage();
  const { total, shoppingList } = useContext(GlobalContext);

  const cartList = shoppingList?.map((prod, index) => {
    return (
      <ShoppingCart
        key={index}
        qtd={prod.prod_qtd}
        id={prod.user_id_product}
        subtotal={prod.sum}
      ></ShoppingCart>
    );
  });

  return (
    <>
      <Header />
      <div>CartPage</div>
      <div>{cartList}</div>
      <div> Total:R$ {total?.total}</div>
      <button onClick={addPurchase} >Comprar!
      </button>
      {/* <div>{isLoaded ? <ShoppingCart /> : "Loading..."}</div> */}
    </>
  );
}
