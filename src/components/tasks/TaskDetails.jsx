import { useEffect, useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import request from "@/utils/request";
import { useRouter } from "next/router";
import { comment } from "postcss";
import Comments from "../Comments/Comments";
import AddUserTask from "./AddUserTask";
import RemoveUser from "./RemoveUser";
import useToken from "@/hooks/useToken";

const initialForm = {
  title: "",
  description: "",
  dateLimit: "",
  state: "",
  comment: "",
};

export default function TaskDetails({
  changeShow,
  setUpdateTask,
  currentTask,
}) {
  const { getToken } = useToken();
  const [form, setForm] = useState(initialForm);
  const [task, setTask] = useState({});
  const [updateComment, setUpdateComment] = useState(0);
  const [showAddUser, setShowAddUser] = useState(false);
  const [updateAssignament, setUpdateAssignament] = useState(0);
  const router = useRouter();

  const handleForm = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  const updateTask = async (e) => {
    e.preventDefault();
    for (const [key, value] of Object.entries(form)) {
      if (key != "comment") {
        if (value == "") {
          alert("Por favor complete todos los campos.");
          return;
        }
      }
    }
    const updateTask = {
      ...form,
      id: currentTask,
      dateLimit: new Date(form.dateLimit).toISOString(),
    };
    delete updateTask.comment;
    const res = await request("tasks/" + currentTask, getToken(), {
      method: "PATCH",
      body: JSON.stringify(updateTask),
    });
    if (res.message) return alert("Error en la creación de la tarea.");
    setUpdateTask(res.id);
    alert('Actualización exitosa')
  };

  const deleteTask = async (e) => {
    e.preventDefault();
    const res = await request("tasks/" + currentTask, getToken(), {
      method: "DELETE",
    });
    if (res.message) return alert("Error en la eliminación de la tarea.");
    setUpdateTask(res.id);
    changeShow(false);
  };

  const createComment = async (e) => {
    e.preventDefault();
    if (form.comment == "") return alert("Por favor ingrese un comentario.");

    const res = await request("comments", getToken(), {
      method: "POST",
      body: JSON.stringify({
        comment: form.comment,
        user_id: 1,
        date: new Date().toISOString(),
        task_id: currentTask,
      }),
    });
    if (res.message) return alert("Error en la creacion del comentario");
    setUpdateComment(res.id);
  };

  useEffect(() => {
    (async () => {
      const res = await request("tasks/" + currentTask, getToken());
      if (res.id) {
        if (updateAssignament == 0)
          setForm({
            title: res.title,
            description: res.description,
            dateLimit: new Date(res.dateLimit).toISOString().split("T")[0],
            state: res.state,
          });
        setTask(res);
      }
    })();
  }, [updateAssignament]);

  return (
    <div className="bg-[#00000050] absolute top-0 right-0 z-50 w-full h-full flex flex-col justify-center items-center ">
      <i
        onClick={() => changeShow(false)}
        className="pi pi-times-circle absolute top-10 right-10 cursor-pointer"
        style={{ fontSize: "1.5rem", color: "#fff" }}
      ></i>
      <div className="max-[800px]:flex-col flex flex-row w-3/4 bg-white  rounded-lg ">
        <form className="flex flex-col gap-7  py-10  px-6 w-[100%] sm:w-[100%] lg:w-[45%]">
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
          <div className="flex gap-3 overflow-x-auto">
            {task.assignedUsers &&
              task.assignedUsers.map(({ user, id }) => (
                <RemoveUser
                  assignamentId={id}
                  user={user}
                  setUpdateAssignament={setUpdateAssignament}
                />
              ))}
            <div
              className="hover:cursor-pointer hover:bg-[#ccc] w-[42px] h-[42] rounded-full bg-[#000] flex justify-center items-center"
              onClick={() => setShowAddUser(true)}
            >
              <i
                className="pi pi-plus"
                style={{ fontSize: "1rem", color: "#fff" }}
              ></i>
            </div>
          </div>
          <div className="w-full flex justify-between">
            <Button
              classExtra={"w-[40%]"}
              onClick={updateTask}
              text="Actualizar tarea"
            />
            <Button
              classExtra={"w-[40%]"}
              onClick={deleteTask}
              text="Eliminar tarea"
            />
          </div>
        </form>
        <div className="w-[80%]  py-10  px-6 h-full">
          <form className="flex flex-col gap-6">
            <Input
              value={form.comment}
              name="comment"
              onChange={handleForm}
              label="Escriba su comentario"
            />
            <Button
              classExtra={"w-[40%]"}
              onClick={createComment}
              text="Comentar"
            />
          </form>
          <Comments updateComment={updateComment} currentTask={currentTask} />
        </div>
      </div>
      {showAddUser && (
        <AddUserTask
          changeShow={setShowAddUser}
          currentTask={currentTask}
          setUpdateAddUsers={setUpdateAssignament}
        />
      )}
    </div>
  );
}
