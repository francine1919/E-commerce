import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { base_Url } from "../../Constants/base_Url";
import { goToSignupPage } from "../../Router/coordinator";
import { GlobalContext } from "../GlobalContext/GlobalContext";

const GlobalState = (props) => {
  
  const [total, setTotal] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [shoppingList, setShoppingList] = useState(undefined);
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const headers = {
    headers: { authorization: localStorage.getItem("token") },
  };

  const getShoppingList = () => {
    axios
      .get("http://localhost:3003/shopping/list", headers)
      .then((res) => {
        setShoppingList(res.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        if (err.response.data === "jwt expired") {
          setIsTokenExpired(true);
          setIsLoaded(true);
        }
        console.log(err.response.data);
        setIsLoaded(true);
      });
  };
  const getTotal = () => {
    axios
      .get(base_Url + "/shopping/total", headers)
      .then((res) => {
        setTotal(res.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        if (err.response.data === "jwt expired") {
          setIsTokenExpired(true);
          setIsLoaded(true);
        }
        console.log(err.response);
        setIsLoaded(true);
      });
  };

  useEffect(() => {
    getTotal();
  }, [shoppingList]);

  useEffect(() => {
    getShoppingList();
  }, [total]);

  return (
    <GlobalContext.Provider
      value={{
        total,
        shoppingList,
        isLoaded,
        isTokenExpired,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
export default GlobalState;
