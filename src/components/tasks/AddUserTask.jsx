import { useState } from "react";
import Input from "../common/Input";
import request from "@/utils/request";
import useToken from "@/hooks/useToken";

const initialForm = {
  user: "",
};

export default function AddUserTask({ changeShow, currentTask, setUpdateAddUsers }) {
  const { getToken } = useToken();
  const [user, setUser] = useState({});
  const [form, setForm] = useState(initialForm);
  const handleForm = async ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
    const res = await request("users/username/" + target.value, getToken());
    if (res.id) setUser(res);
    else setUser({});
  };

  const addUser = async () => {
    const res = await request("tasks/assignament/user", getToken(), {
        method: 'POST',
        body: JSON.stringify({
            user_id: user.id,
            task_id: currentTask,
        })
    });
    if(res.message == 'Usuario ya existe en la tarea') return alert('Usuario ya fue asiganado');
    alert('Usuario agregado correctamente.');
    setUpdateAddUsers(res.id);
  }

  return (
    <div className="bg-[#00000050] absolute top-0 right-0 z-150 w-full h-full flex flex-col justify-center items-center ">
      <i
        onClick={() => changeShow(false)}
        className="pi pi-times-circle absolute top-10 right-10 cursor-pointer"
        style={{ fontSize: "1.5rem", color: "#fff" }}
      ></i>
      <div className="max-[800px]:flex-col flex flex-row  sm:w-[50%] lg:w-[25%] bg-white  rounded-lg ">
        <form className="flex flex-col gap-7  py-10  px-6 w-full">
          <h2 className="font-bold text-[1.3rem]" >Agregar usuario al proyecto</h2>
          <Input
            value={form.title}
            name="title"
            onChange={handleForm}
            label="Nombre de usuario"
          />
          {user.username && (
            <div onClick={addUser} className="hover:bg-[#ccc] hover:cursor-pointer border-2 p-2 rounded-lg flex items-center">
              <div className="flex justify-center items-center text-white uppercase w-[32px] h-[32px] rounded-full bg-[#000]">
                {user.username ? user.username[0] : "u"}
              </div>
              <span className="ml-3">{user.username}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
