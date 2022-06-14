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

export const addProductToCart = (Id) => {
  const url = `${base_Url}/shopping/add`;
  const body = { user_id_product: Id };
  axios
    .post(url, body, headers)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getShoppingList = () => {
  axios
    .get(base_Url + "/shopping/list", headers)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response);
    });
};
