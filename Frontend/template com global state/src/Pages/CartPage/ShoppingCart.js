import React, { useContext } from "react";
import { capitalize } from "../../Functions/functions";
import { GlobalContext } from "../../Global/GlobalContext/GlobalContext";

export default function ShoppingCart(props) {
  const { onAdd, onRemove } = useContext(GlobalContext);

  return (
    <>
      <div>
        <p>{capitalize(props.name.toLowerCase())}</p>
        <button
          onClick={() => {
            onAdd(props.id);
          }}
        >
          +
        </button>
        <p>{props.qtd}</p>
        <button
          onClick={() => {
            onRemove(props.id);
          }}
        >
          -
        </button>
        <p>Preço unitário: R$ {props.subtotal}</p>
      </div>
    </>
  );
}
