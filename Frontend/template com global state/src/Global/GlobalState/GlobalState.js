import axios from "axios";
import { useEffect, useState } from "react";
import { base_Url } from "../../Constants/base_Url";
import { GlobalContext } from "../GlobalContext/GlobalContext";

const GlobalState = (props) => {
  const [total, setTotal] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [shoppingList, setShoppingList] = useState(undefined);

  const headers = {
    headers: { Authorization: localStorage.getItem("token") },
  };
  const getShoppingList = () => {
    axios
      .get("http://localhost:3003/shopping/list", headers)
      .then((res) => {
        setShoppingList(res.data);
        // console.log(res.data)
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err.response.data);
        setIsLoaded(true);
      });
  };
  const getTotal = () => {
    axios
      .get(base_Url + "/shopping/total", headers)
      .then((res) => {
        setTotal(res.data);
        // console.log(res.data)
        setIsLoaded(true);
      })
      .catch((err) => {
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
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
export default GlobalState;
