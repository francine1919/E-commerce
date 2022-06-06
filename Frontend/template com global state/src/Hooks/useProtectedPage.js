import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useProtectedPage = () => {
  const navigate = useNavigate();
  //Controlando o acesso
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      navigate("/");
    }
  }, []);
};
