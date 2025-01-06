import { useRouter } from "next/router";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import Button from "@/components/common/Button";
import request from "@/utils/request";
import CreateTask from "@/components/tasks/CreateTask";
import Task from "@/components/tasks/Task";
import TaskDetails from "@/components/tasks/TaskDetails";
import Input from "@/components/common/Input";
import TaskFilters from "@/components/tasks/TaskFilters";
import useToken from "@/hooks/useToken";

export default function Project() {
  const { getToken } = useToken();
  const [query, setQuery] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  const [updateTasks, setUpdateTask] = useState(0);
  const [currentTask, setCurrentTask] = useState(0);
  const [project, setProject] = useState({});
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  const searchByKeyword = async ({ target }) => {
    setQuery(target.value);
    const newQuery = target.value.split(" ").join(",");
    const res = await request(
      `tasks/find/keywords?project_id=${router.query.id}&query=${newQuery}`,
      getToken()
    );
    if (res.length > 0) setTasks(res);
  };

  const onFilterChange = async (filter) => {
    let newFilter = "?";
    for (const f in filter) {
      if (filter[f] != "") newFilter += `${f}=${filter[f]}&`;
    }
    newFilter += "task_id=" + router.query.id;
    const res = await request("tasks/find/filters" + newFilter, getToken());
    if (Array.isArray(res)) setTasks(res);
  };

  useEffect(() => {
    if (router.query.id) {
      (async () => {
        const id = Number(router.query.id);
        let res = await request("projects/" + id, getToken());
        if (res.id) setProject(res);
        res = await request("tasks/project/" + id, getToken());
        if (res.length > 0) setTasks(res);
      })();
    }
  }, [router.query, updateTasks]);
  return (
    <Layout>
      <div className="w-full h-full flex justify-center items-center">
        <div className="min-h-[450px] h-full flex flex-col justify-center items-center rounded-lg w-3/4 bg-[--secondaryBackground]">
          <div className="flex w-full px-5 justify-between">
            <h1 className="text-[2.5rem] w-[80%]">{project.title || "Proyecto"}</h1>
            <Button
              classExtra="mt-4 max-h-12"
              text="Crear Tarea"
              onClick={() => setShowCreate(true)}
            />
          </div>
          <div className="w-full p-5 flex gap-5 justify-between items-center">
            <Input
              label="Buscar por palabra clave"
              name="query"
              value={query}
              onChange={searchByKeyword}
              className="flex-grow"
            />
            <TaskFilters onFilterChange={onFilterChange} />
          </div>
          <div className="max-[800px]:grid-cols-1 w-full p-4 grid grid-cols-3 gap-2">
            <div className="max-h-[70%]">
              <div className="p-4 border-2 border-[#ccc] rounded-t-lg border-collapse">
                <span className="font-medium text-[#666]">POR HACER</span>
              </div>
              <div className="overflow-y-auto mt-3 p-4 border-2 border-[#ccc] rounded-b-lg border-collapse  h-full">
                {tasks
                  .filter((task) => task.state == "TODO")
                  .map((task) => (
                    <Task
                      showDetails={setShowTaskDetail}
                      setCurrentTask={setCurrentTask}
                      key={task.id}
                      data={task}
                      setUpdateTask={setUpdateTask}
                    />
                  ))}
              </div>
            </div>
            <div className="max-h-[70%]">
              <div className="p-4 border-2 border-[#ccc] rounded-t-lg border-collapse">
                <span className="font-medium text-[#666]">EN PROGRESO</span>
              </div>
              <div className="overflow-y-auto mt-3 p-4 border-2 border-[#ccc] rounded-b-lg border-collapse h-full">
                {tasks
                  .filter((task) => task.state == "INPROGRESS")
                  .map((task) => (
                    <Task
                      showDetails={setShowTaskDetail}
                      setCurrentTask={setCurrentTask}
                      key={task.id}
                      data={task}
                      setUpdateTask={setUpdateTask}
                    />
                  ))}
              </div>
            </div>
            <div className="max-h-[70%]">
              <div className="p-4 border-2 border-[#ccc] rounded-t-lg border-collapse">
                <span className="font-medium text-[#666]">COMPLETADO</span>
              </div>
              <div className="overflow-y-auto mt-3 p-4 border-2 border-[#ccc] rounded-b-lg border-collapse  h-full">
                {tasks
                  .filter((task) => task.state == "FINISHED")
                  .map((task) => (
                    <Task
                      showDetails={setShowTaskDetail}
                      setCurrentTask={setCurrentTask}
                      key={task.id}
                      data={task}
                      setUpdateTask={setUpdateTask}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showCreate && (
        <CreateTask changeShow={setShowCreate} setUpdateTask={setUpdateTask} />
      )}
      {showTaskDetail && (
        <TaskDetails
          changeShow={setShowTaskDetail}
          setUpdateTask={setUpdateTask}
          currentTask={currentTask}
        />
      )}
    </Layout>
  );
}
