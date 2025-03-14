import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BE_HOST}api/token/`,
        {username, password}
      );
      localStorage.setItem('token', response.data.access);
      navigate('/dashboard');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className='h-screen flex justify-center items-center'>
      <form className='bg-white p-6 rounded shadow' onSubmit={handleLogin}>
        <input
          className='block w-full p-2 border'
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
          type='text'
        />
        <input
          className='block w-full p-2 border'
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          type='text'
        />
        <button className='bg-blue-500 text-white w-full p-2 mt-4'>
          Login
        </button>
      </form>
    </div>
  )
}