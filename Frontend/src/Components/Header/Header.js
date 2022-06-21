import React from "react";
import { ContainerHeaderLogin } from "./styled";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const isTokenSet = localStorage.getItem("token");
  const logout = () => {
    const isLogout = window.confirm("Deseja realmente sair?");
    if (isLogout) {
      localStorage.clear();
      navigate("/");
    }
  };
  return (
    <div>
      <ContainerHeaderLogin>
        <button onClick={() => navigate("/")}>Home</button>

        <button onClick={() => navigate("/shop")}>Loja</button>

        {isTokenSet ? <button onClick={() => logout()}>Logout</button> : ""}
      </ContainerHeaderLogin>
    </div>
  );
}
