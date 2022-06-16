import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <button onClick={() => navigate("/signup")}> Cadastre-se</button>
      Home
    </div>
  );
}
