import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const isExpired = (token: string | null) => {
  if (!token) return true;

  try {
    const decoded: { exp: number } = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    console.error(error);
    return true;
  }
}

export const useAuth = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (isExpired(token)) {
      localStorage.removeItem('token');
      navigate('/');
    }
  }, [navigate, token]);

  return {
    navigate,
    token
  };
}