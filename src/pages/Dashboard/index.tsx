import List from '../../components/List';

const Dashboard = () => {
  return (
    <List
      endpoint='api/projects/'
      title='Projects'
      type='project'
    />
  );
}

export default Dashboard;