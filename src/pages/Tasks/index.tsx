import { Link, useParams, useSearchParams } from 'react-router-dom';
import List from '../../components/List';

export default function Tasks() {
  const { id } = useParams();
  const [ searchParams ] = useSearchParams();

  return (
    <>
      <Link to='/dashboard' className='absolute top-2 left-2'>{`< Dashboard`}</Link>
      <List
        endpoint={`api/projects/${id}`}
        id={id as unknown as number}
        title={`Project: ${searchParams.get('name')}`}
        type='task'
      />
    </>
  );
}