import { FormEvent, useState } from "react";
import { capitalize } from "../../utils/capitalize";

interface ModalProps {
  onClose: () => void;
  refetch: () => void;
  type: string;
}

const Modal: React.FC<ModalProps> = ({ onClose, refetch, type }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const capitalized = capitalize(type);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(`${import.meta.env.VITE_BE_HOST}api/${type}s/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, status: 0 }),
    });

    onClose();
    refetch();
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
      <div className='bg-blue-900 p-5 relative rounded shadow-lg'>
        <h2 className='text-xl font-bold'>{`Add New ${capitalized}`}</h2>
        <button className='absolute right-0 top-0' onClick={onClose}>X</button>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder={`${capitalized} Name`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border p-2 w-full mt-2'
          />
          <textarea
            placeholder={`${capitalized} Description`}
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