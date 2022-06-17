import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { GlobalContext } from "../../Global/GlobalContext/GlobalContext";
import { useProtectedPage } from "../../Hooks/useProtectedPage";
import { addPurchase } from "../../Services/services";
import ShoppingCart from "./ShoppingCart";

export default function CartPage() {
  useProtectedPage();
  const navigate = useNavigate();
  const { total } = useContext(GlobalContext);
  let cart = localStorage.getItem("carrinho");
  let retrievedCart = JSON.parse(cart);

  const cartList = retrievedCart?.map((prod, index) => {
    return (
      <ShoppingCart
        key={index}
        name={prod.name}
        qtd={prod.prod_qtd}
        id={prod.id}
        subtotal={prod.price}
      ></ShoppingCart>
    );
  });
  return (
    <>
      <Header />
      <div>CartPage</div>
      <div>{cartList}</div>
      <div> Total:R$ {total.toFixed(2)}</div>
      <button
        onClick={() => {
          addPurchase(
            retrievedCart.toString(),
            total,
            navigate
          );
        }}
      >
        Comprar!
      </button>
    </>
  );
}
