import { FormEvent, useState } from "react";

interface ModalProps {
  type: 'projects' | 'tasks';
}

const Modal: React.FC<ModalProps> = ({ type }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(`${import.meta.env.VITE_BE_HOST}api/${type}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, status: 0 }),
    });
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
      <div className='bg-white p-5 rounded shadow-lg'>
        <h2 className='text-xl font-bold'>{`Add New ${type === 'projects' ? 'Project' : 'Task'}`}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Project Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border p-2 w-full mt-2'
          />
          <textarea
            placeholder='Project Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='border p-2 w-full mt-2'
          ></textarea>
          <button className='bg-blue-500 text-white px-4 py-2 mt-3' type='submit'>
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;