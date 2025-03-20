import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import { statusColors, statusTerms } from '../../utils/constants';
import { capitalize } from '../../utils/capitalize';
import { useAuth } from '../../hooks/useAuth';

interface ItemType {
  endpoint: string;
  id?: number;
  title: string;
  type: string;
}

interface ListItem {
  description: string;
  id: number;
  name?: string;
  status: number;
  title?: string;
}

const List: React.FC<ItemType> = ({ endpoint, id = null, title, type }) => {
  const { navigate, token } = useAuth();
  const [list, setList] = useState<ListItem[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const capitalizedType = capitalize(type);

  const fetchData = () => {
    axios.get(`${import.meta.env.VITE_BE_HOST}${endpoint}`, {
      headers: { Authorization: `Bearer ${token}`},
    })
      .then((response) => setList(response.data))
      .catch((error) => console.error(error));
  };

  const handleDelete = async(id: number) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BE_HOST}api/${type}s/${id}`, {
        headers: { Authorization: `Bearer ${token}`},
      });

      fetchData();
    } catch (error) {
      console.error(`Error deleting item: ${error}`);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    fetchData();
  }, []);

  return (
    <>
      {isModalOpen && <Modal onClose={() => setModalOpen(false)} projectId={id} refetch={fetchData} type={type} />}
      <div className='m-auto p-4'>
        <h1 className='text-2xl font-bold'>{title}</h1>
        <button className='bg-blue-900' onClick={() => setModalOpen(true)}>{`Add New ${capitalizedType}`}</button>
        <ul>
          {list.map((listItem) => {
            const { description, id, name = '', title = '', status } = listItem;

            const cardTitle = type === 'project' ? name : type === 'task' ? title : '';

            const itemCard = (
              <li className={`border mt-2 p-2 relative rounded-lg shadow-md ${statusColors[status]}`}>
                <h2 className='font-bold text-left text-lg'>{cardTitle}</h2>
                <p className='mt-1 text-gray-700 text-left text-sm'>{description}</p>
                <span className='absolute bg-gray-200 bottom-2 font-semibold px-2 py-1 right-2 rounded text-xs text-gray-700'>{statusTerms[status]}</span>
              </li>
            );

            return  (
              <div key={id} className="relative">
                {type === 'project' ? (
                  <>
                    <Link className='text-white' to={`/projects/${id}`}>
                      {itemCard}
                    </Link>
                    <span className='absolute bg-gray-200 cursor-pointer top-2 font-semibold px-2 py-1 right-2 rounded text-xs text-gray-700' onClick={() => handleDelete(id)} role='button'>DELETE</span>
                  </>
                ) : type === 'task' ? (
                  <div key={id}  className="relative">
                    {itemCard}
                    <span className='absolute bg-gray-200 cursor-pointer top-2 font-semibold px-2 py-1 right-2 rounded text-xs text-gray-700' onClick={() => handleDelete(id)} role='button'>DELETE</span>
                  </div>
                ) : null}
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default List;