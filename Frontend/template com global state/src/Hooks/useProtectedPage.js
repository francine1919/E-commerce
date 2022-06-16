import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../Global/GlobalContext/GlobalContext";

export const useProtectedPage = () => {
  const navigate = useNavigate();

  //Controlling the access
  useEffect(() => {
    setTimeout(() => (localStorage.removeItem("token"), 3600000));
    const token = localStorage.getItem("token");
    if (token === null) {
      alert("Faça o cadastro para continuar.");
      navigate("/signup");
    }
  }, []);
};
