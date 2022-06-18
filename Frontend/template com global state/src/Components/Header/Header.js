import React from "react";
import { ContainerHeaderLogin } from "./styled";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const isTokenSet = localStorage.getItem("token");
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div>
      <ContainerHeaderLogin>
        <p onClick={() => navigate("/")}>Home</p>

        <p onClick={() => navigate("/shop")}>Loja</p>

        {isTokenSet ? <p onClick={() => logout()}>Logout</p> : ""}
      </ContainerHeaderLogin>
    </div>
  );
}
