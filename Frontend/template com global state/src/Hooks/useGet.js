import { useEffect, useState } from "react";
import axios from "axios";
import { base_Url } from "../Constants/base_Url";

export const useGet = (path) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  //Axios get data

  const getData = async () => {
    const token = localStorage.getItem("token");
    const header = { headers: { authorization: token } };
    try {
      const resp = await axios.get(base_Url + path, header);
      setIsLoading(false);
      // console.log(resp);
      setData(resp.data);
    } catch (err) {
      setIsLoading(false);
      if (err.response.data.error === "jwt expired") {
        localStorage.removeItem("token");
        alert("Token expirado, realize novamente o cadastro.");
      } else {
        alert(`${err.response.data.error}`);
      }
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return { data, isLoading };
};
