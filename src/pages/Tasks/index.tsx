import axios from "axios";
import { useEffect, useState } from "react";

interface Task {
  description: string;
  id: number;
  status: string;
  title: string;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BE_HOST}api/tasks/`)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold'>Tasks</h1>
      <ul>
        {tasks.map((task) => {
          const { description, id, status, title } = task;

          return (
            <li key={id} className='border p-2 mt-2'>
              <h2 className='text-xl'>{title}</h2>
              <p>{description}</p>
              <span className='text-sm text-gray-500'>{status}</span>
            </li>
          );
        })}
      </ul>
    </div>
  )
}