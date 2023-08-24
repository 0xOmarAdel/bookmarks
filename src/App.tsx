import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';

import SingUp from './pages/SingUp';
import LogIn from './pages/LogIn';
import ForgotPassword from './pages/ForgotPassword';
import Bookmarks from './pages/Bookmarks';
import Loading from './components/Loading';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
      }
      setIsLoading(false);
    });
  }, [auth])

  if (isLoading) return <Loading />

  return (
    <>
      <Routes>
        <Route path='*' element={<ErrorPage />} />
        <Route path='/sign-up' element={!isAuthenticated ? <SingUp /> : <Navigate to='/' />} />
        <Route path='/log-in' element={!isAuthenticated ? <LogIn /> : <Navigate to='/' />} />
        <Route path='/forgot-password' element={!isAuthenticated ? <ForgotPassword /> : <Navigate to='/' />} />
        <Route path='/' element={<RootLayout />}>
          <Route path='/bookmarks' element={isAuthenticated ? <Bookmarks /> : <Navigate to='/' />} />
        </Route>
      </Routes>
    </>
  );
};
  
  export default App;