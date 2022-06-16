import React from "react";
import { capitalize } from "../../Functions/functions";
import { useGet } from "../../Hooks/useGet";

export default function ShoppingCart(props) {
//  const { data, isLoading } = useGet("/stock/" + props.id);
//   const names = data?.name;
// const { total, shoppingList } = useContext(GlobalContext);
 //  const namesWithFirstLetterToUppercase = props.name?.charAt(0).toUpperCase() + props.name?.slice(1); 
 
   return (
    <>
      
        <div>
          <p>{capitalize(props.name.toLowerCase())}</p>
          <button>+</button>
          <p>{props.qtd}</p>
          <button>-</button>
          <p>{props.subtotal}</p>
        </div>

    </>
  );
}
