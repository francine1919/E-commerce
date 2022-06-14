import React from "react";
import Header from "../../Components/Header/Header";
import { useProtectedPage } from "../../Hooks/useProtectedPage";

export default function CartPage() {
  useProtectedPage();
  return (
    <>
      <Header />
      <div>CartPage</div>
    </>
  );
}
