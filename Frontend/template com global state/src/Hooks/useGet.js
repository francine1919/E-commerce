import { useState } from "react";
import axios from "axios";
import { base_Url } from "../Constants/base_Url";

export const useGet = (path) => {
  const [data, setData] = useState();

  //Axios get posts

  const getData = async () => {
    const token = localStorage.getItem("token");
    const header = { headers: { authorization: token } };
    try {
      const resp = await axios.get(base_Url + path, header);
      console.log(resp);
      setData(resp.data);
    } catch (err) {
      if (err.response.data.error === "jwt expired") {
        localStorage.removeItem("token");
        alert("Token expirado, realize novamente o login.");
      } else {
        alert(`${err.response.data.error}`);
      }
    }
  };

  return { data, getData };
};
