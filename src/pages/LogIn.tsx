import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { AiOutlineMail } from 'react-icons/ai';
import { VscKey } from 'react-icons/vsc';

const LogIn: React.FC = () => {
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
    <div className='h-screen flex justify-center items-center mx-4'>
      <div className="max-w-md bg-white shadow-lg rounded px-8 pt-6 pb-8">
        <h3 className='mb-8 text-3xl text-primaryRed text-center font-bold tracking-wide'>Log In</h3>
        <form onSubmit={submitHandler} className='flex flex-col gap-4'>
          <div className='w-full'>
            <Input id='email' type='text' placeholder='Email' value={email} onChange={(newValue) => setEmail(newValue)} icon={AiOutlineMail} />
          </div>            
          <div className='w-full'>
            <Input id='current-password1' type='password' placeholder='Password' value={password} onChange={(newValue) => setPassword(newValue)} icon={VscKey} />
          </div>
          <Button text='Log In' className='mt-4 mb-2' />
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