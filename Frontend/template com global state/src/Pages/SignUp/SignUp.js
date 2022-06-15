import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import useForm from "../../Hooks/useForm";
import { useProtectedPage } from "../../Hooks/useProtectedPage";
import { signUp } from "../../Services/services";

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
    <div>
      <Header />
      <h1>Cadastre-se</h1>
      <form onSubmit={onSignUp}>
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
        <div>
          <button type={"submit"}>Enviar</button>
          <Link to="/">
            <button>Voltar</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
