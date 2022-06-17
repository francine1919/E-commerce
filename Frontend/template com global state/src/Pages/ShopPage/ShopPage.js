import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { GlobalContext } from "../../Global/GlobalContext/GlobalContext";
import { useGet } from "../../Hooks/useGet";
import { useProtectedPage } from "../../Hooks/useProtectedPage";
import ShoppingCard from "./ShoppingCard";

export default function ShopPage() {
  useProtectedPage();
  const { data, isLoading } = useGet("/stock/all");
  const { total} = useContext(GlobalContext);
  const productList = data?.map((prod) => {
    return <ShoppingCard key={prod.id} name={prod.name} id={prod.id} />;
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
