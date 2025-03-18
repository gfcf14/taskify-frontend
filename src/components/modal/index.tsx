import { FormEvent, useState } from "react";

interface ModalProps {
  onClose: () => void;
  type: 'projects' | 'tasks';
}

const Modal: React.FC<ModalProps> = ({ onClose, type }) => {
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
      <div className='bg-blue-900 p-5 relative rounded shadow-lg'>
        <h2 className='text-xl font-bold'>{`Add New ${type === 'projects' ? 'Project' : 'Task'}`}</h2>
        <button className='absolute right-0 top-0' onClick={onClose}>X</button>
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