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
import Profile from './pages/Profile';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
      setIsLoading(false);
    });
  }, [auth])

  if (isLoading) return <Loading />

  return (
    <>
      <Routes>
        <Route path='*' element={<ErrorPage />} />
        <Route path='/sign-up' element={!isAuthenticated ? <SingUp /> : <Navigate to='/bookmarks' />} />
        <Route path='/log-in' element={!isAuthenticated ? <LogIn /> : <Navigate to='/bookmarks' />} />
        <Route path='/forgot-password' element={!isAuthenticated ? <ForgotPassword /> : <Navigate to='/bookmarks' />} />
        <Route element={isAuthenticated ? <RootLayout /> :  <Navigate to='/log-in' />}>
          <Route path='/' element={<Navigate to='/bookmarks' />} />
          <Route path='/bookmarks' element={<Bookmarks />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};
  
  export default App;