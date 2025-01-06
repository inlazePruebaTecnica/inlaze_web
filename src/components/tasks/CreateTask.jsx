import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import request from "@/utils/request";
import { useRouter } from "next/router";
import useToken from "@/hooks/useToken";

const initialForm = {
  title: "",
  description: "",
  dateLimit: "",
  state: "",
};

export default function CreateTask({ changeShow, setUpdateTask }) {
  const { getToken } = useToken();
  const [form, setForm] = useState(initialForm);
    const router = useRouter();

  const handleForm = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  const createTask = async (e) => {
    e.preventDefault();
    for (const [key, value] of Object.entries(form)) {
      if (value == "") {
        alert("Por favor complete todos los campos.");
        return;
      }
    }
    const res = await request("tasks/", getToken(), {
      method: "POST",
      body: JSON.stringify({
        ...form,
        proyectId: Number( router.query.id),
        dateLimit: new Date(form.dateLimit).toISOString(),
      }),
    });
    if(res.message) return alert("Error en la creación de la tarea.");
    alert('Tarea creada');
    setUpdateTask(res.id);
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
          label="Nombre de la tarea"
        />
        <Input
          value={form.description}
          name="description"
          onChange={handleForm}
          label="Descripción de la tarea"
          type="textarea"
        />
        <Input
          value={form.dateLimit}
          name="dateLimit"
          type="date"
          onChange={handleForm}
          label="Fecha limite"
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="state" className="font-medium text-gray-700">
            Estado de la tarea
          </label>
          <select
            id="state"
            name="state"
            value={form.state}
            onChange={handleForm}
            className="rounded-lg px-2 py-3 border-2 w-full"
          >
            <option value="">Seleccione un estado</option>
            <option value="TODO">Por hacer</option>
            <option value="INPROGRESS">En proceso</option>
            <option value="FINISHED">Completada</option>
          </select>
        </div>
        <div className="w-full flex justify-between">
          <Button classExtra={"w-[40%]"} onClick={createTask} text="Crear" />
        </div>
      </form>
    </div>
  );
}
