import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { GlobalContext } from "../../Global/GlobalContext/GlobalContext";
import { useGet } from "../../Hooks/useGet";
import { useProtectedPage } from "../../Hooks/useProtectedPage";
import ShoppingCard from "../../Components/ShoppingCard/ShoppingCards"
import spinner from "../../Assets/images/spinner.gif";
import { ContainerShoppingCard, ContainerTopShopPage, Spinner } from "./styled";
export default function ShopPage() {
  useProtectedPage();
  const { data, isLoading } = useGet("/stock/all");
  const { total } = useContext(GlobalContext);
  const productList = data?.map((prod) => {
    return <ShoppingCard key={prod.id} name={prod.name} id={prod.id} price={prod.price}/>;
  });
  return (
    <>
      <Header />

        <ContainerTopShopPage>
          <Link to="/cart">
            <button>Carrinho</button>
          </Link>
          <p> Total: R$ {total.toFixed(2)} </p>
        </ContainerTopShopPage>
      <ContainerShoppingCard>{isLoading ? <Spinner src={spinner} alt="loading" /> : productList}</ContainerShoppingCard>
    </>
  );
}
