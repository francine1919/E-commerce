import axios from "axios";
import { base_Url } from "../Constants/base_Url";
import { goToShopPage } from "../Router/coordinator";

export const headers = {
  headers: { Authorization: localStorage.getItem("token") },
};
export const signUp = (body, navigate) => {
  axios
    .post(base_Url + "/user/create", body)
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      alert("Cadastro realizado!");
      goToShopPage(navigate);
    })
    .catch((err) => {
      alert(` ${err.response}`);
    });
};

export const addProductToCart = (id) => {
  const url = `${base_Url}/shopping/add`;
  const body = { user_id_product: id };
  axios
    .post(url, body, headers)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

