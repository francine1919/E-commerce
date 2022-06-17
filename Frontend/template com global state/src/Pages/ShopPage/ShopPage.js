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
  const { cart, setCart } = useContext(GlobalContext);

  let carrinho = [];

  // useEffect(() => {
  //   setCart(JSON.parse(window.localStorage.getItem("cart")));
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem("cart", JSON.stringify(cart));
  // }, [data]);

  const onAdd = (produtoId) => {
    const productsInCart = cart?.find((item) => produtoId === item.id);

    if (productsInCart) {
      const newProductsInCart = cart.map((item) => {
        if (produtoId === item.id) {
          return {
            ...item,
            prod_qtd: item.prod_qtd + 1,
          };
        }
    
        return item;
      });
      setCart(newProductsInCart);

      localStorage.setItem("carrinho", JSON.stringify(newProductsInCart));
    } else {
      const productToAdd = data?.find((item) => produtoId === item.id);
      const newProductsInCart = [...cart, { ...productToAdd, prod_qtd: 1 }];
      setCart(newProductsInCart);
      localStorage.setItem("carrinho", JSON.stringify(newProductsInCart));
      
    }
  };
  const onRemove = (produtoId) => {
    const productsInCart = cart?.find(
      (item) => produtoId === item.id && item.prod_qtd > 0
    );
    if (productsInCart) {
      const newProductsInCart = cart?.map((item) => {
        if (produtoId === item.id) {
          return {
            ...item,
            prod_qtd: item.prod_qtd - 1,
          };
        }
        
        return item;
      });
      const newProductsInCartFilter = newProductsInCart?.filter((item) => {
        return item.prod_qtd > 0;
      });

      setCart(newProductsInCartFilter);

      localStorage.setItem("carrinho", JSON.stringify(newProductsInCartFilter));

    }
  };

  const totals = localStorage.getItem("carrinho");
  const retrievedCart = JSON.parse(totals);

  let total = 0;
  retrievedCart?.forEach((prod) => {
    total += prod.prod_qtd * prod.price;
  });
  localStorage.setItem("total", JSON.stringify(total));

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
        
        <button
          onClick={() => {
            onRemove(prod.id);
          }}
        >
        Remover
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
      <div> Total: R$ {total}</div>
      <div>{isLoading ? "Loading..." : productList}</div>
   
    </>
  );
}
