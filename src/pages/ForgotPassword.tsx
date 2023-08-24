import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import Button from "../ui/Button";
import {Link} from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const submitHandler = async(e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className="max-w-md bg-white shadow-lg rounded px-8 pt-6 pb-8">
        <h3 className='mb-8 text-3xl text-primaryRed text-center font-bold tracking-wide'>Reset Password</h3>
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
          <Button text='Reset' className='mb-4' />
          <div className='flex flex-row justify-center gap-2 text-sm'>
            <Link to='/log-in' className='text-primaryRed font-semibold'>Log In</Link>
            <span>|</span>
            <Link to='/sign-up' className='text-primaryRed font-semibold'>Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;