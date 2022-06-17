// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { capitalize } from "../../Functions/functions";
// import { useGet } from "../../Hooks/useGet";

// export default function ShoppingCard(props) {
//   //   const { data, isLoading } = useGet("/stock/" + props.id);
//   const { data, isLoading } = useGet("/stock/all");
//   const [is, setIs] = useState(false);
//   const [total, setTotal] = useState(0);
//   const onAdd = (produtoId) => {
//     let retrievedCartItems = localStorage.getItem("carrinho");
//     let cart = JSON.parse(retrievedCartItems);
//     const productsInCart = cart?.find((item) => produtoId === item.id);
//     if (productsInCart) {
//       const newProductsInCart = cart.map((item) => {
//         if (produtoId === item.id) {
//           return {
//             ...item,
//             prod_qtd: item.prod_qtd + 1,
//           };
//         }

//         return item;
//       });
//       localStorage.setItem("carrinho", JSON.stringify(newProductsInCart));
//       setIs(!is);
//     } else {
//       const productToAdd = data?.find((item) => produtoId === item.id);
//       const newProductsInCart = [...cart, { ...productToAdd, prod_qtd: 1 }];

//       localStorage.setItem("carrinho", JSON.stringify(newProductsInCart));
//       setIs(!is);
//     }
//   };
//   const onRemove = (produtoId) => {
//     let retrievedCartItems = localStorage.getItem("carrinho");
//     let cart = JSON.parse(retrievedCartItems);

//     const productsInCart = cart?.find(
//       (item) => produtoId === item.id && item.prod_qtd > 0
//     );
//     if (productsInCart) {
//       const newProductsInCart = cart?.map((item) => {
//         if (produtoId === item.id) {
//           return {
//             ...item,

//             prod_qtd: item.prod_qtd - 1,
//           };
//         }

//         return item;
//       });

//       const newProductsInCartFilter = newProductsInCart?.filter((item) => {
//         return item.prod_qtd > 0;
//       });

//       localStorage.setItem("carrinho", JSON.stringify(newProductsInCartFilter));
//       setIs(!is);
//     }
//   };
//   return (
//     <>
//       <div>
//         <div key={props.id}>
//           <img src="https://picsum.photos/200/300" alt="Random images" />
//           <p>{capitalize(props.name.toLowerCase())} </p>
//           <button
//             onClick={() => {
//               onAdd(props.id);
//             }}
//           >
//             Adicionar
//           </button>

//           <button
//             onClick={() => {
//               onRemove(props.id);
//             }}
//           >
//             Remover
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }
