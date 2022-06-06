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
        <Link to="/aboutus">
          <p>about us</p>
        </Link>
      </ContainerHeaderLogin>
    </div>
  );
}
