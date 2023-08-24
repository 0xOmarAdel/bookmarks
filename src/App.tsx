import { Navigate, Route, Routes } from 'react-router-dom';

import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';

import SingUp from './pages/SingUp';
import LogIn from './pages/LogIn';
import ForgotPassword from './pages/ForgotPassword';
import Bookmarks from './pages/Bookmarks';

const App = () => {
  const isAuthenticated = false;

  return (
    <>
      <Routes>
        <Route path='/sign-up' element={!isAuthenticated ? <SingUp /> : <Navigate to='/' />} />
        <Route path='/log-in' element={!isAuthenticated ? <LogIn /> : <Navigate to='/' />} />
        <Route path='/forgot-password' element={!isAuthenticated ? <ForgotPassword /> : <Navigate to='/' />} />
        <Route path='/' element={<RootLayout />}>
          <Route path='/bookmarks' element={isAuthenticated ? <Bookmarks /> : <Navigate to='/' />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
};
  
  export default App;