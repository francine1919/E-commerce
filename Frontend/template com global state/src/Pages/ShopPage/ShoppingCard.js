import React, { useContext } from "react";
import { capitalize } from "../../Functions/functions";
import { GlobalContext } from "../../Global/GlobalContext/GlobalContext";

export default function ShoppingCard(props) {
  const { onAdd } = useContext(GlobalContext);
  return (
    <>
      <div>
        <img src="https://picsum.photos/200/300" alt="Random images" />
        <p>{capitalize(props.name.toLowerCase())} </p>
        <button
          onClick={() => {
            onAdd(props.id);
          }}
        >
          Adicionar
        </button>
      </div>
    </>
  );
}
