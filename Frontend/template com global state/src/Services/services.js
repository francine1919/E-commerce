import axios from "axios";
import { base_Url } from "../Constants/base_Url";
import { goToHomePage, goToShopPage } from "../Router/coordinator";

export const headers = {
  headers: { Authorization: localStorage.getItem("token") },
};

export const signUp = (body, navigate) => {
  const url=base_Url + "/user/create"
  axios
  .post(url, body)
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

export const addPurchase = (cart, total, navigate) => {
  const url = base_Url+"/purchase/final";
  const body = { cart_items: cart, total: total };

  axios
    .post(url, body, headers)
    .then((res) => {
      window.localStorage.setItem("carrinho", JSON.stringify([]));
      window.localStorage.setItem("total", JSON.stringify(0));
     alert(res.data)
      goToHomePage(navigate);
      window.location.reload(false);
    })
    .catch((err) => {
         console.log(err.response);
    });
};
export const decreaseStockQty=(idProd,qty_stock, prod_qtd)=>{
  const url=base_Url+"/purchase/updateQty"
  let newQtyInStock=qty_stock-prod_qtd
  const body={
    qty_stock:newQtyInStock,
    id:idProd
  }
  axios
    .post(url, body, headers)
    .then((res) => {
   console.log(res.data)
    })
    .catch((err) => {
      console.log(err.response);
    });

}
