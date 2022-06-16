import React from "react";
import { useGet } from "../../Hooks/useGet";

export default function ShoppingCart(props) {
  const { data, isLoading } = useGet("/stock/" + props.id);
  const names = data?.name;
  const namesWithFirstLetterToUppercase = names?.charAt(0).toUpperCase() + names?.slice(1);
  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <div>
          <p>{namesWithFirstLetterToUppercase}</p>
          <p>{props.qtd}</p>
          <p>{props.subtotal}</p>
        </div>
      )}
    </>
  );
}
