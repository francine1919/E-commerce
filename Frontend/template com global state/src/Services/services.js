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
      window.location.reload(false);
      window.localStorage.setItem("carrinho", JSON.stringify([]));

    })
    .catch((err) => {
      alert(` ${err.response.data}`);
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

export const addPurchase = (navigate) => {
  const url = `${base_Url}/purchase/total`;

  axios
    .get(url, headers)
    .then((res) => {
      goToShopPage(navigate)
    })
    .catch((err) => {
      console.log(err);
    });
};

// export const addPurchase=(id)=>{
//  const url = `${base_Url}/shopping/add`;
//  const body = { user_id_product: id };

//  axios
//    .post(url, body, headers)
//    .then((res) => {
//      console.log(res.data);
//    })
//    .catch((err) => {
//      console.log(err);
//    });
//   }
