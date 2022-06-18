import React, { useContext } from "react";
import { capitalize } from "../../Functions/functions";
import { GlobalContext } from "../../Global/GlobalContext/GlobalContext";
import { ContainerCard, ContainerCardInfo } from "./styled";
export default function ShoppingCard(props) {
  const { onAdd } = useContext(GlobalContext);
  return (
    <>
     
      <ContainerCard>
        <img src="https://picsum.photos/200/300" alt="Random images" />
        <ContainerCardInfo>
          <p>{capitalize(props.name.toLowerCase())} </p>
          <p>R$ {props.price}</p>
          <button
            onClick={() => {
              onAdd(props.id);
            }}
          >
            Adicionar
          </button>
        </ContainerCardInfo>
      </ContainerCard>
  
    </>
  );
}
