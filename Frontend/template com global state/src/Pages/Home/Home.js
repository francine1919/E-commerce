import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";

export default function Home() {
  const navigate = useNavigate();
  const isTokenSet = localStorage.getItem("token");

  return (
    <div>
      <Header />
      <button
        // isTokenSet ? () => navigate("/signup") : () => navigate("/login")
        onClick={() => navigate("/signup")}
      >
        Cadastre-se
      </button>
      Home
    </div>
  );
}
