import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { GlobalContext } from "../../Global/GlobalContext/GlobalContext";
import { useProtectedPage } from "../../Hooks/useProtectedPage";
import { addPurchase } from "../../Services/services";
import ShoppingCart from "./ShoppingCart";
import { ContainerCart, ContainerCartItem, Total } from "./styled";

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
        stock={prod.qty_stock}
      ></ShoppingCart>
    );
  });
  return (
    <>
    <Header />
      <ContainerCart>
        {/* <h2>Minha sacola</h2> */}
        <h3>Meus produtos</h3>
        <div>{cartList}</div>
        <Total> Total:R$ {total.toFixed(2)}</Total>
        <button
          onClick={() => {
            addPurchase(JSON.stringify(retrievedCart), total, navigate);
          }}
        >
          Comprar!
        </button>
      </ContainerCart>
    </>
  );
}
