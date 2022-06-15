import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { capitalize } from "../../Functions/functions";
import { useGet } from "../../Hooks/useGet";
import { useProtectedPage } from "../../Hooks/useProtectedPage";
import { addProductToCart } from "../../Services/services";
import ShoppingCard from "./ShoppingCard";

export default function ShopPage() {
  useProtectedPage();
  const { data, isLoading } = useGet("/stock/all");
  const [total, setTotal] = useState();
  const [list, setList] = useState();

  //mover para global state
  const getShoppingList = () => {
    const headers = {
      headers: { authorization: localStorage.getItem("token") },
    };
    axios
      .get("http://localhost:3003/shopping/list", headers)
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  //mover para global state
  const getTotal = () => {
    const headers = {
      headers: { authorization: localStorage.getItem("token") },
    };
    axios
      .get("http://localhost:3003/shopping/total", headers)
      .then((res) => {
        setTotal(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const cartList = list?.map((prod) => {
    return (
      <ShoppingCard
        key={prod.user_id_product}
        qtd={prod.prod_qtd}
        id={prod.user_id_product}
        subtotal={prod.sum}
      ></ShoppingCard>
    );
  });

  useEffect(() => {
    getShoppingList();
    getTotal();
  }, [cartList]);

  const productList = data?.map((prod) => {
    return (
      <div key={prod.id}>
        <img src="https://picsum.photos/200/300" alt="Random images" />
        <p>{capitalize(prod.name.toLowerCase())} </p>
        <button
          onClick={() => {
            addProductToCart(prod.id);
          }}
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  });

  return (
    <>
      <Header />
      <div>ShopPage</div>
      <div>{cartList}</div>
      <div> Total: {total?.total}</div>
      <div>{isLoading ? "Loading..." : productList}</div>
    </>
  );
}
