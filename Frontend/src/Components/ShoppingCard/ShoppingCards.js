import React, { useContext } from "react";
import { capitalize } from "../../Functions/functions";
import { GlobalContext } from "../../Global/GlobalContext/GlobalContext";
import { ContainerCard, ContainerCardInfo } from "../../Pages/ShopPage/styled";
export default function ShoppingCard(props) {
  const { onAdd, isProductInStock } = useContext(GlobalContext);

  return (
    <>
      <ContainerCard>
        <img src="https://picsum.photos/200/300" alt="Random images" />
        <ContainerCardInfo>
          <p>{capitalize(props.name.toLowerCase())} </p>
          <p>R$ {props.price}</p>
          {isProductInStock ? (
            <button
              onClick={() => {
                onAdd(props.id);
              }}
            >
              Adicionar
            </button>
          ) : (
            <button>Produto indisponível</button>
          )}
        </ContainerCardInfo>
      </ContainerCard>
    </>
  );
}
