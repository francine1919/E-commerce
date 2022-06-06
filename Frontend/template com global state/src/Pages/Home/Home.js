import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";


export default function Home() {
    const navigate = useNavigate();
    const isTokenSet = localStorage.getItem("token");
 

  return (
    <div>
      <Header />
      <button onClick={isTokenSet?()=>navigate("/agro/user/wallet"):()=>navigate("/login")}>Criar carteira</button>
      Home
    </div>
  );
}
