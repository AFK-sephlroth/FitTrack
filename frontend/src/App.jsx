import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Admin from './pages/Admin';
import About from './pages/About';
import PrivateRoutes from './routes/PrivateRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/'       element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route element={<PrivateRoutes />}>
          <Route path='/home'  element={<Home />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/about' element={<About />} />
        </Route>

        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;