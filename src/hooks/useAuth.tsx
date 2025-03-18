import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  return {
    navigate,
    token
  };
}