import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import cart from "../../Assets/images/shoppingCart2.jpg";
import logo from "../../Assets/images/ecommerce_logo.png"
import { ContainerButton, ContainerHome, ContainerTitle, ImgHome, LogoHome } from "./styled";
export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <ContainerHome>
        <ImgHome src={cart} alt="Shopping cart" />
        <ContainerTitle>
          <LogoHome src={logo} alt="Shopping logo" />
          <ContainerButton>
            <button onClick={() => navigate("/shop")}> Compre</button>
            <button onClick={() => navigate("/signup")}> Cadastre-se</button>
          </ContainerButton>{" "}
        </ContainerTitle>
      </ContainerHome>
    </div>
  );
}
