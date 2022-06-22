export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const clearStorage=()=>{
  return(
            window.localStorage.setItem("carrinho", JSON.stringify([])),
                window.localStorage.setItem("total", JSON.stringify(0)),
                 window.location.reload(false))
}