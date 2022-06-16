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
  const { total, shoppingList } = useContext(GlobalContext);

  // const cartList = shoppingList?.map((prod, index) => {
  //   return (
  //     <ShoppingCart
  //       key={index}
  //       qtd={prod.prod_qtd}
  //       id={prod.user_id_product}
  //       subtotal={prod.sum}
  //     ></ShoppingCart>
  //   );
  // });
  let cart = localStorage.getItem("cart");
  let retrievedCart = JSON.parse(cart);

  let totals = 0;
   retrievedCart.forEach((prod) => {
     totals += prod.prod_qtd * prod.price;
     
   })
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
      <div> Total:R$ {totals.toFixed(2)}</div>
      {/* <div> Total:R$ {total?.total}</div> */}
      <button
        onClick={() => {
          addPurchase(navigate);
        }}
      >
        Comprar!
      </button>
      {/* <div>{isLoaded ? <ShoppingCart /> : "Loading..."}</div> */}
    </>
  );
}
