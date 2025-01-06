import Input from "@/components/common/Input";
import { useState } from "react";
import Layout from "../Layout";
import Image from "next/image";
import logo from "../../../public/img/logo.png";
import Button from "@/components/common/Button";
import { useRouter } from "next/router";
import request from "@/utils/request";
import useToken from "@/hooks/useToken";

const initialForm = {
  username: "",
  password: "",
  confirmPassword: "",
};
export default function Login() {
  const { saveToken } = useToken();
  const [form, setForm] = useState(initialForm);
  const router = useRouter();

  const handleForm = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    router.push("/login");
  };

  const register = async (e) => {
    e.preventDefault();
    for (const [key, value] of Object.entries(form)) {
      if (value == "") {
        alert("Por favor complete todos los campos.");
        return;
      }
    }
    if (form.password != form.confirmPassword)
      return alert("Las contraseñas deben ser iguales.");
    const res = await request("auth/register", null, {
      method: "POST",
      body: JSON.stringify({
        username: form.username,
        password: form.password,
      }),
    });
    if(res.message) {
      if(res.message.includes('Usuario ya existe')) return alert('El usuario ya existe');
    }
    saveToken(res.token);
    router.push("/dashboard"); 
  };

  return (
    <Layout>
      <div className="w-full  h-screen flex flex-col justify-center items-center ">
        <Image className="w-[15rem] mb-10" src={logo} />
        <form className="flex flex-col gap-7 rounded-lg bg-white py-10  px-6 w-[70%] sm:w-[50%] lg:w-[35%]">
          <Input
            value={form.username}
            name="username"
            onChange={handleForm}
            label="Nombre de usuario"
          />
          <Input
            value={form.password}
            name="password"
            type="password"
            onChange={handleForm}
            label="Contraseña"
          />
          <Input
            value={form.confirmPassword}
            name="confirmPassword"
            type="password"
            onChange={handleForm}
            label="Confirmar contraseña"
          />
          <div className="w-full flex justify-between">
            <Button
              classExtra={"w-[40%]"}
              onClick={register}
              text="Registrarse"
            />
            <Button
              classExtra={"w-[40%]"}
              onClick={login}
              text="Iniciar sesión"
            />
          </div>
        </form>
      </div>
    </Layout>
  );
}
