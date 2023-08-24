import { Navigate, Route, Routes } from 'react-router-dom';

import RootLayout from './pages/RootLayout';
import Home from './pages/Home';
import SingUp from './pages/SingUp';
import LogIn from './pages/LogIn';
import ForgotPassword from './pages/ForgotPassword';
import Bookmarks from './pages/Bookmarks';

const App = () => {
  const isAuthenticated = true;

  return (
    <>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/sign-up' element={!isAuthenticated ? <SingUp /> : <Navigate to='/' />} />
          <Route path='/log-in' element={!isAuthenticated ? <LogIn /> : <Navigate to='/' />} />
          <Route path='/forgot-password' element={!isAuthenticated ? <ForgotPassword /> : <Navigate to='/' />} />
          <Route path='/bookmarks' element={isAuthenticated ? <Bookmarks /> : <Navigate to='/' />} />
        </Route>
      </Routes>
    </>
  );
};
  
  export default App;