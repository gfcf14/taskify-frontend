import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
interface Task {
  description: string;
  id: number;
  status: string;
  title: string;
}

export default function Dashboard() {
  const { navigate, token } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    axios.get(`${import.meta.env.VITE_BE_HOST}api/tasks/`, {
      headers: { Authorization: `Bearer ${token}`},
    })
    .then((response) => setTasks(response.data))
    .catch(() => navigate('/'));
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2x1 font-bold'>Dashboard</h1>
      <ul>
        {tasks.map((task) => {
          const { description, status, title } = task;

          return (
            <li className='border p-2 mt-2' key={task.id}>
              <h2 className='text-x1'>{title}</h2>
              <p>{description}</p>
              <span className='text-sm text-gray-500'>{status}</span>
            </li>
          );
        })}
      </ul>
    </div>
  )
}