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
  const [is, setIs] = useState(false);
  const [total, setTotal] = useState(0);
  // useEffect(() => {
  //   setCart(JSON.parse(window.localStorage.getItem("cart")));
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem("cart", JSON.stringify(cart));
  // }, [data]);

  const onAdd = (produtoId) => {
    let retrievedCartItems = localStorage.getItem("carrinho");
    let cart = JSON.parse(retrievedCartItems);
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
      localStorage.setItem("carrinho", JSON.stringify(newProductsInCart));
      setIs(!is);
    } else {
      const productToAdd = data?.find((item) => produtoId === item.id);
      const newProductsInCart = [...cart, { ...productToAdd, prod_qtd: 1 }];

      localStorage.setItem("carrinho", JSON.stringify(newProductsInCart));
      setIs(!is);
    }
  };
  const onRemove = (produtoId) => {
    let retrievedCartItems = localStorage.getItem("carrinho");
    let cart = JSON.parse(retrievedCartItems);

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

      localStorage.setItem("carrinho", JSON.stringify(newProductsInCartFilter));
      setIs(!is);
    }
  };

  let totalPurchase = 0;

  useEffect(() => {
    let cart = localStorage.getItem("carrinho");
    let retrievedCart = JSON.parse(cart);
      retrievedCart?.forEach((prod) => {
      totalPurchase += prod.prod_qtd * prod.price;
      localStorage.setItem("total", JSON.stringify(totalPurchase));
      setTotal(totalPurchase);
      return totalPurchase;
    });
  }, [is]);

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
      <div> Total: R$ {total.toFixed(2)}</div>
      <div>{isLoading ? "Loading..." : productList}</div>
    </>
  );
}
