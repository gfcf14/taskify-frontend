import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import Projects from './pages/Projects';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/tasks' element={<Tasks />}></Route>
        <Route path='/projects' element={<Projects />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
