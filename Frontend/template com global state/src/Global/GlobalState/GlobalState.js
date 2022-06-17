import axios from "axios";
import { useEffect, useState } from "react";
import { base_Url } from "../../Constants/base_Url";
import { useGet } from "../../Hooks/useGet";
import { GlobalContext } from "../GlobalContext/GlobalContext";

const GlobalState = (props) => {
  const { data, isLoading } = useGet("/stock/all");

  const [isLoaded, setIsLoaded] = useState(false);
  const [total, setTotal] = useState(0);
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
      setIsLoaded(!isLoaded);
    } else {
      const productToAdd = data?.find((item) => produtoId === item.id);
      const newProductsInCart = [...cart, { ...productToAdd, prod_qtd: 1 }];

      localStorage.setItem("carrinho", JSON.stringify(newProductsInCart));
      setIsLoaded(!isLoaded);
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
      setIsLoaded(!isLoaded);
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
  }, [isLoaded]);
  // const headers = {
  //   headers: { Authorization: localStorage.getItem("token") },
  // };

  return (
    <GlobalContext.Provider
      value={{
        total,
        isLoading,
        onAdd,
        onRemove,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
export default GlobalState;
