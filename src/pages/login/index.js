import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { Container, Page } from "./style";
import Logo from "../../Logo.png";

const Login = ({ isLogged, setIsLogged, setError }) => {
  const url = "https://kenziehub.herokuapp.com";

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .email("Digite um email válido")
      .required("Email obrigatório"),

    password: yup.string().required("Senha obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  console.log(errors);

  const history = useHistory();

  const toSignUp = () => {
    history.push("/signup");
  };

  const onSubmitFunction = (data) => {
    console.log(data);
    axios
      .post(`${url}/sessions`, data)
      .then((response) => {
        console.log(response.data.token);
        console.log(response.data.user);
        const token = response.data.token;
        const user = response.data.user;

        localStorage.setItem("@KenzieHub:token", JSON.stringify(token));
        localStorage.setItem("@KenzieHub:user", JSON.stringify(user));

        setIsLogged(true);

        return history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  if (isLogged) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Page>
      <img src={Logo} />

      <Container>
        <h1> Login</h1>

        <form onSubmit={handleSubmit(onSubmitFunction)}>
          <Input
            register={register}
            name="email"
            label="Email"
            placeholder="Seu email cadastrado"
            error={errors.email?.message}
          />

          <Input
            register={register}
            name="password"
            label="Senha"
            type="password"
            placeholder="Sua senha"
            error={errors.password?.message}
          />

          <Button type="submit">Entrar</Button>
        </form>

        <h4> Ainda não tem uma conta?</h4>

        <Button onClick={toSignUp} schemaGrey={true}>
          Cadastre-se
        </Button>
      </Container>
    </Page>
  );
};

export default Login;
