import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      console.log(userCredential)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className="max-w-md bg-white shadow-lg rounded px-8 pt-6 pb-8">
        <h3 className='mb-8 text-3xl text-primaryRed text-center font-bold tracking-wide'>Log In</h3>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button text='Log In' className='mb-4' />
          <div className='flex flex-row justify-center gap-2 text-sm'>
            <Link to='/sign-up' className='text-primaryRed font-semibold'>Register</Link>
            <span>|</span>
            <Link to='/forgot-password' className='text-primaryRed font-semibold'>Reset</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;