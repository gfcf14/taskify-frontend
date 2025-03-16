import axios from "axios";
import { useEffect, useState } from "react";

interface Project {
  description: string;
  id: number;
  name: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BE_HOST}api/projects`)
      .then((response) => setProjects(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold'>Projects</h1>
      <ul>
        {projects.map((project) => {
          const { description, id, name } = project;

          return (
            <li key={id} className='border p-2 mt-2'>
              <h2 className='text-xl'>{name}</h2>
              <p>{description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}