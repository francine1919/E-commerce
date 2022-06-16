import React from "react";
import { useGet } from "../../Hooks/useGet";

export default function ShoppingCart(props) {
  const { data, isLoading } = useGet("/stock/" + props.id);
  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <div>
          <p>{data?.name}</p>
          <p>{props.qtd}</p>
          <p>{props.subtotal}</p>
        </div>
      )}
    </>
  );
}
