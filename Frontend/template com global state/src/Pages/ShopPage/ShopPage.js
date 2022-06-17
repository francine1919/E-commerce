import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { capitalize } from "../../Functions/functions";
import { GlobalContext } from "../../Global/GlobalContext/GlobalContext";
import { useGet } from "../../Hooks/useGet";
import { useProtectedPage } from "../../Hooks/useProtectedPage";

export default function ShopPage() {
  useProtectedPage();
  const { data, isLoading } = useGet("/stock/all");
   const { total, onAdd} = useContext(GlobalContext);

  const productList = data?.map((prod) => {
    return (
      <div key={prod.id}>
        <img src="https://picsum.photos/200/300" alt="Random images" />
        <p>{capitalize(prod.name.toLowerCase())} </p>
        <button
          onClick={() => {
            onAdd(prod.id);
          }}
        >
          Adicionar
        </button>
      </div>
    );
  });

  return (
    <>
      <Header />
      <div>ShopPage</div>
      <Link to="/cart">
        <button>Carrinho</button>
      </Link>
      <div> Total: R$ {total.toFixed(2)}</div>
      <div>{isLoading ? "Loading..." : productList}</div>
    </>
  );
}
