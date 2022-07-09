import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const useProtectedPage = () => {
  const navigate = useNavigate();

  //Controlling the access
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      alert("Faça o cadastro para continuar.");
      navigate("/signup");
    }
  }, []);
};
