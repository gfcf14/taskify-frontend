import { useParams } from 'react-router-dom';
import List from '../../components/List';

export default function Tasks() {
  const {id} = useParams();

  return (
    <List
      endpoint={`api/projects/${id}`}
      id={id as unknown as number}
      title='Project'
      type='task'
    />
  );
}