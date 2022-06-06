import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import useForm from "../../Hooks/useForm";
import { base_Url } from "../../Constants/base_Url";

export default function SignUp() {
  const navigate = useNavigate();
  //form
  const { form, onChangeForm, clearForm } = useForm({
    name: "",
    email: "",
    password: "",
  });
  const onSignUp = (e) => {
    e.preventDefault();
   
  };
  //endpoint signup
  const signUp = () => {
    const body = form;
    axios
      .post(base_Url + "/user/signup", body)
      .then((res) => {
         clearForm();
        localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch((err) => {
        alert(`${err.response.data}`);
      });
  };
  return (
    <div>
      <Header />
      <h1>Cadastre-se</h1>
      <form onSubmit={onSignUp}>
        <p>Nome</p>
        <input
          type="text"
          name={"name"}
          placeholder="Nome"
          onChange={onChangeForm}
          value={form.name}
          required
        />
        <p>Email</p>
        <input
          type="text"
          name={"email"}
          placeholder="Email"
          onChange={onChangeForm}
          value={form.email}
          required
        />

        <p>Senha</p>
        <input
          type="password"
          name={"password"}
          placeholder="Senha"
          onChange={onChangeForm}
          value={form.password}
          required
        />
        <div>
          <button type={"submit"} onClick={signUp}>
            Enviar
          </button>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
