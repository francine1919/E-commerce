import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import useForm from "../../Hooks/useForm";
import { signUp } from "../../Services/services";
import { ContainerButton, ContainerForm, ContainerSignup } from "./styled";

export default function SignUp() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {navigate("/shop")};
  }, []);

  //form
  const { form, onChangeForm, clearForm } = useForm({
    username: "",
    delivery_date: "",
  });
  const onSignUp = (e) => {
    e.preventDefault();
    signUp(form, navigate);
    clearForm();
  };

  return (
    <>
      <Header />
      <ContainerSignup>
      <h1>Cadastre-se</h1>
      <ContainerForm onSubmit={onSignUp}>
        <p>Nome</p>
        <input
          type="text"
          name={"username"}
          placeholder="Nome"
          onChange={onChangeForm}
          value={form.username}
          required
        />
        <p>Data de entrega</p>
        <input
          type="date"
          name={"delivery_date"}
          placeholder="Data de entrega"
          onChange={onChangeForm}
          value={form.delivery_date}
          required
        />
        <ContainerButton>
          <button type={"submit"}>Enviar</button>
          <Link to="/">
            <button>Voltar</button>
          </Link>
        </ContainerButton>
      </ContainerForm>
   </ContainerSignup> </>
  );
}
