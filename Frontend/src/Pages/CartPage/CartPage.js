import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { clearStorage } from "../../Functions/functions";
import { GlobalContext } from "../../Global/GlobalContext/GlobalContext";
import { useProtectedPage } from "../../Hooks/useProtectedPage";
import { addPurchase, decreaseStock } from "../../Services/services";
import ShoppingCart from "../../Components/ShoppingCart/ShoppingCart"
import {
  ContainerButton,
  ContainerCart,
  ContainerEmptyCart,
  Total,
} from "./styled";

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
      {retrievedCart.length > 0 ? (
        <ContainerCart>
          <h3>Meus produtos</h3>
          <div>{cartList}</div>
          <Total> Total:R$ {total.toFixed(2)}</Total>
          <ContainerButton>
            <button
              onClick={() => {
                addPurchase(JSON.stringify(retrievedCart), total, navigate);
                decreaseStock();
              }}
            >
              Comprar
            </button>
            <button
              onClick={() => {
                clearStorage();
              }}
            >
              Limpar sacola
            </button>
          </ContainerButton>
        </ContainerCart>
      ) : (
        <ContainerEmptyCart> Sua sacola está vazia 🛍️ </ContainerEmptyCart>
      )}
    </>
  );
}
