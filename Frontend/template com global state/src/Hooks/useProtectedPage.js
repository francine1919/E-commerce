import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../Global/GlobalContext/GlobalContext";

export const useProtectedPage = (path) => {
  const navigate = useNavigate();
  const { isTokenExpired } = useContext(GlobalContext);

  //Controlling the access
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      alert("Faça o cadastro para continuar.");
      navigate("/signup");
    }
    if (isTokenExpired) {
      // alert("Seu token de acesso expirou, por favor logue-se novamente");
      navigate("/signup");
    }
  }, []);
};
