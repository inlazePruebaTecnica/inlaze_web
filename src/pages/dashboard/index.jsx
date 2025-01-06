import Button from "@/components/common/Button";
import Layout from "../Layout";
import Projects from "@/components/projects/Projects";
import { useState } from "react";
import CreateProject from "@/components/projects/CreateProject";

export default function Dashboard() {
  const [showCreate, setShowCreate] = useState(false);
  const [updateProjects, setUpdateProjects] = useState(0);
  return (
    <Layout>
      <div className="w-full flex justify-center items-center">
        <div className="rounded-lg w-3/4 bg-[--secondaryBackground]">
          <div className="flex w-full px-5 justify-between">
            <h1 className="text-[2.5rem]">Proyectos</h1>
            <Button
              classExtra="mt-4"
              text="Crear Proyecto"
              onClick={() => setShowCreate(true)}
            />
          </div>
          <Projects updateProjects={updateProjects} />
        </div>
      </div>
      {showCreate && (
        <CreateProject
          changeShow={setShowCreate}
          setUpdateProjects={setUpdateProjects}
        />
      )}
    </Layout>
  );
}
