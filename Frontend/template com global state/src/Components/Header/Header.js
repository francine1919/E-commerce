import React from "react";
import { ContainerHeaderLogin } from "./styled";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <ContainerHeaderLogin>
        <Link to="/">
          <p>home</p>
        </Link>
        <Link to="/signup">
          <p>Cadastre-se</p>
        </Link>
      </ContainerHeaderLogin>
    </div>
  );
}
