import React, { useContext } from "react";
import { capitalize } from "../../Functions/functions";
import { GlobalContext } from "../../Global/GlobalContext/GlobalContext";
import { ContainerCartItem, ContainerCartItemQtd } from "./styled";

export default function ShoppingCart(props) {
  const { onAdd, onRemove } = useContext(GlobalContext);

  return (
    <>
    <ContainerCartItem>
      <p>{capitalize(props.name.toLowerCase())}</p>
      <ContainerCartItemQtd>
        {" "}
        <button
          onClick={() => {
            onAdd(props.id);
          }}
        >
          +
        </button>
      <span>{props.qtd}</span>
      <button
        onClick={() => {
          onRemove(props.id);
        }}
        >
        -
      </button>
        </ContainerCartItemQtd>
      <p>Preço unitário: R$ {props.subtotal}</p>
</ContainerCartItem>
    </>
  );
}
