import { FormEvent, useEffect, useState } from 'react';
import { capitalize } from '../../utils/capitalize';
import { EditData, statusTerms } from '../../utils/constants';

interface ModalProps {
  editData: EditData;
  isEditing: boolean;
  onClose: () => void;
  projectId?: number | null;
  refetch: () => void;
  type: string;
}

const Modal: React.FC<ModalProps> = ({ editData, isEditing, onClose, projectId, refetch, type }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [id, setId] = useState(-1);
  const [status, setStatus] = useState('');
  const capitalized = capitalize(type);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestBody = isEditing ? {
      description,
      id,
      status,
      ...(type === 'project' ? { name } : { title: name })
    } : type === 'project' ? {
      name, description, status: 0
    } : type === 'task' ? {
      description,
      project: projectId,
      status: 0,
      title: name
    } : {};

    await fetch(`${import.meta.env.VITE_BE_HOST}api/${type}s/${isEditing ? id : ''}`, {
      method: isEditing ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    onClose();
    refetch();
  }

  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setDescription(editData.description);
      setId(editData.id);
      setStatus(editData.status as unknown as string);
    }
  }, []);

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
      <div className='bg-blue-900 p-5 relative rounded shadow-lg'>
        <h2 className='text-xl font-bold'>{`${isEditing ? 'Edit Existing' : 'Add New'} ${capitalized}`}</h2>
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
          {isEditing && (
            <select className='border p-2 rounded w-full' onChange={(e) => setStatus(e.target.value)} value={status}>
              <option value={0}>{statusTerms[0]}</option>
              <option value={1}>{statusTerms[1]}</option>
              <option value={2}>{statusTerms[2]}</option>
              <option value={3}>{statusTerms[3]}</option>
            </select>
          )}
          <button className='bg-blue-500 text-white px-4 py-2 mt-3' type='submit'>
            {isEditing ? 'Update' : 'Add'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;