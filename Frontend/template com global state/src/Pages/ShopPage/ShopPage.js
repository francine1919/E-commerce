import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { capitalize } from "../../Functions/functions";
import { GlobalContext } from "../../Global/GlobalContext/GlobalContext";
import { useGet } from "../../Hooks/useGet";
import { useProtectedPage } from "../../Hooks/useProtectedPage";
import { addProductToCart } from "../../Services/services";
export default function ShopPage() {
  useProtectedPage();
  const { data, isLoading } = useGet("/stock/all");
  const { total } = useContext(GlobalContext);

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
      <Link to="/cart">
        <button>Carrinho</button>
      </Link>
      <div> Total: {total?.total}</div>
      <div>{isLoading ? "Loading..." : productList}</div>
    </>
  );
}
