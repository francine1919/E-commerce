import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import useForm from "../../Hooks/useForm";
import { base_Url } from "../../Constants/base_Url";

export default function Login() {
  const navigate = useNavigate();

  //form
  const { form, onChangeForm, clearForm } = useForm({
    username: "",
   
  });
  const onLogin = (e) => {
    e.preventDefault();
  };
  //endpoint signup
  const Login = () => {
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
      <h1>Login</h1>
      <form onSubmit={onLogin}>
        <p>Nome</p>
        <input
          type="text"
          name={"username"}
          placeholder="Nome"
          onChange={onChangeForm}
          value={form.username}
          required
        />
        <div>
          <button type={"submit"} onClick={Login}>
            Enviar
          </button>
          <Link to="/">
            <button>Voltar</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
