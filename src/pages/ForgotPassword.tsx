import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import Button from "../ui/Button";
import {Link} from 'react-router-dom';
import Input from "../ui/Input";
import { AiOutlineMail } from "react-icons/ai";

const ForgotPassword: React.FC = () => {
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
    <div className='h-screen flex justify-center items-center mx-4'>
      <div className="max-w-md bg-white shadow-lg rounded px-8 pt-6 pb-8">
        <h3 className='mb-8 text-3xl text-primaryRed text-center font-bold tracking-wide'>Reset Password</h3>
        <form onSubmit={submitHandler} className='flex flex-col gap-4'>
          <div className='w-full'>
            <Input id='email' type='text' placeholder='Email' value={email} onChange={(newValue) => setEmail(newValue)} icon={AiOutlineMail} />
          </div> 
          <Button text='Reset' className='mt-4 mb-2' />
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