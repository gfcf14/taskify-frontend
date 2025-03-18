import axios from "axios";
import { useEffect, useState } from "react";
import { statusColors } from "../../utils/constants";
import Modal from "../../components/Modal";
import { capitalize } from "../../utils/capitalize";

interface ItemType {
  type: string;
}

interface ListItem {
  description: string;
  id: number;
  name: string;
  status: number;
}

const List: React.FC<ItemType> = ({ type }) => {
  const [list, setList] = useState<ListItem[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const capitalized = capitalize(type);

  const fetchData = () => {
    axios.get(`${import.meta.env.VITE_BE_HOST}api/${type}s`)
      .then((response) => setList(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isModalOpen && <Modal onClose={() => setModalOpen(false)} refetch={fetchData} type={type} />}
      <div className='container mx-auto p-4'>
        <h1 className='text-2xl font-bold'>{capitalized}</h1>
        <button className='bg-blue-900' onClick={() => setModalOpen(true)}>{`Add New ${capitalized}`}</button>
        <ul>
          {list.map((listItem) => {
            const { description, id, name, status } = listItem;

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

export default List;