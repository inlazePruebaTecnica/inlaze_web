import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import request from "@/utils/request";
import useToken from "@/hooks/useToken";

const initialForm = {
  title: "",
  description: "",
};

export default function CreateProject({ changeShow, setUpdateProjects }) {
  const { getToken } = useToken();
  const [form, setForm] = useState(initialForm);

  const handleForm = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  const createProject = async (e) => {
    e.preventDefault();
    for (const [key, value] of Object.entries(form)) {
      if (value == "") {
        alert("Por favor complete todos los campos.");
        return;
      }
    }

    const res = await request("projects/", getToken(), {
      method: "POST",
      body: JSON.stringify(form),
    });
    alert("Proyecto creado");
    setUpdateProjects(res.id);
  };

  return (
    <div className="bg-[#00000050] absolute top-0 right-0 z-50 w-full h-full flex flex-col justify-center items-center ">
      <i
        onClick={() => changeShow(false)}
        className="pi pi-times-circle absolute top-10 right-10 cursor-pointer"
        style={{ fontSize: "1.5rem", color: "#fff" }}
      ></i>
      <form className="flex flex-col gap-7 rounded-lg bg-white py-10  px-6 w-[70%] sm:w-[50%] lg:w-[35%]">
        <Input
          value={form.title}
          name="title"
          onChange={handleForm}
          label="Nombre del proyecto"
        />
        <Input
          value={form.description}
          name="description"
          onChange={handleForm}
          label="Descripción del proyecto"
          type="textarea"
        />
        <div className="w-full flex justify-between">
          <Button classExtra={"w-[40%]"} onClick={createProject} text="Crear" />
        </div>
      </form>
    </div>
  );
}
