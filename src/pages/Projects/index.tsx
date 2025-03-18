import axios from "axios";
import { useEffect, useState } from "react";
import { statusColors } from "../../utils/constants";
import Modal from "../../components/Modal";

interface Project {
  description: string;
  id: number;
  name: string;
  status: number;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BE_HOST}api/projects`)
      .then((response) => setProjects(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {isModalOpen && <Modal onClose={() => setModalOpen(false)} type='projects' />}
      <div className='container mx-auto p-4'>
        <h1 className='text-2xl font-bold'>Projects</h1>
        <button className='bg-blue-900' onClick={() => setModalOpen(true)}>Add New Project</button>
        <ul>
          {projects.map((project) => {
            const { description, id, name, status } = project;

            return (
              <li key={id} className={`border p-2 mt-2 ${statusColors[status]}`}>
                <h2 className='text-xl'>{name}</h2>
                <p>{description}</p>
                <span className='text-sm text-gray-500'>{status}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}