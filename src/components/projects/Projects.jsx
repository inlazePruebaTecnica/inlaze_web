import { useEffect, useState } from "react";
import { DataView } from "primereact/dataview";
import ProjectCard from "./ProjectCard";
import request from "@/utils/request";
import useToken from "@/hooks/useToken";

const listTemplate = (projects) => {
  return (
    <div className="p-6 flex gap-4 flex-wrap">
      {projects.map((project) => (
        <ProjectCard data={project} />
      ))}
    </div>
  );
};

export default function Projects({ updateProjects }) {
  const { getToken } = useToken();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await request("projects/", getToken());
      if (res.length > 0) setProjects(res);
    })();
  }, [updateProjects]);
  return (
    <div>
      <div className="card">
        <DataView value={projects} listTemplate={listTemplate} />
      </div>
    </div>
  );
}
