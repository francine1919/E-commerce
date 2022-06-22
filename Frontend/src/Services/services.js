import axios from "axios";
import { base_Url } from "../Constants/base_Url";
import { goToHomePage, goToShopPage } from "../Router/coordinator";

export const headers = {
  headers: { Authorization: localStorage.getItem("token") },
};

export const signUp = (body, navigate) => {
  const url = base_Url + "/user/create";
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
      console.log(err.response);
    });
};

export const addPurchase = (cart, total, navigate) => {
  const url = base_Url + "/purchase/final";
  const body = { cart_items: cart, total: total };
  axios
    .post(url, body, headers)
    .then((res) => {
      window.localStorage.setItem("carrinho", JSON.stringify([]));
      window.localStorage.setItem("total", JSON.stringify(0));
      alert(res.data);
      goToHomePage(navigate);
      window.location.reload(false);
    })
    .catch((err) => {
      console.log(err.response);
    });
};
 export const decreaseStock = () => {
  const decreaseStockQty = (idProd, qty_stock) => {
    const url = "http://localhost:3003/product/stock";
    let body = {
      id: idProd,
      qty_stock: qty_stock,
    };

    axios
      .put(url, body, headers)
      .then((res) => {})
      .catch((err) => {
        console.log(err.response);
      });
  }
   let cart = localStorage.getItem("carrinho");
   let retrievedCart = JSON.parse(cart);
   let shoppingCart = retrievedCart?.map((prod) => {
     return { id: prod.id, qty: prod.qty_stock };
   });
   const cartItems = shoppingCart.flat(1);

   let i;
   for (i = 0; i < cartItems.length; i++) {
     decreaseStockQty(cartItems[i].id, cartItems[i].qty);
   }
 };
