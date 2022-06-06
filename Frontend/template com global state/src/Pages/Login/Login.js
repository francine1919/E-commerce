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
    email: "",
    password: "",
  });
  const onLogin = (e) => {
    e.preventDefault();
  };

  //login endpoint
  const loginUser = () => {
    const body = form;
    const url = base_Url + "/user/login";
    axios
      .post(url, body)
      .then((res) => {
        clearForm();
        localStorage.setItem("token", res.data.token);
        navigate("/agro/user/wallet");
      })
      .catch((err) => {
        console.log(err);
        alert("Email ou senha incorreta, por favor tente novamente.");
      });
  };
  return (
    <>
      <Header />
      <div>Login</div>

      <form onSubmit={onLogin}>
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
          <button type={"submit"} onClick={loginUser}>
            Enviar
          </button>
          <Link to="/signup">
            <button>Cadrastrar</button>
          </Link>
        </div>
      </form>
    </>
  );
}
