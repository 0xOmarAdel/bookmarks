import { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from '../firebase';
import Button from '../ui/Button';
import {Link} from 'react-router-dom';
import Input from '../ui/Input';
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import { VscKey } from 'react-icons/vsc';

const SingUp: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      updateProfile(auth.currentUser!,{
        displayName: firstName + ' ' + lastName
      });
      const user = userCredential.user;
      const data = {
        firstName,
        lastName,
        email,
        timestamp: serverTimestamp()
      };
      await setDoc(doc(db, 'users', user.uid), data);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className='h-screen flex justify-center items-center mx-4'>
      <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h3 className='mb-8 text-3xl text-primaryRed text-center font-bold tracking-wide'>Sign Up</h3>
        <form onSubmit={submitHandler} className='flex flex-col gap-4'>
          <div className='w-full'>
            <Input id='first-name' type='text' placeholder='First Name' value={firstName} onChange={(newValue) => setFirstName(newValue)} icon={AiOutlineUser} />
          </div>            
          <div className='w-full'>
            <Input id='last-name' type='text' placeholder='Last Name' value={lastName} onChange={(newValue) => setLastName(newValue)} icon={AiOutlineUser} />
          </div>
          <div className='w-full'>
            <Input id='email' type='text' placeholder='Email' value={email} onChange={(newValue) => setEmail(newValue)} icon={AiOutlineMail} />
          </div>            
          <div className='w-full'>
            <Input id='current-password1' type='password' placeholder='Current Password' value={password} onChange={(newValue) => setPassword(newValue)} icon={VscKey} />
          </div>
            <Button text='Sign Up' className='mt-4 mb-2' />
            <div className='flex flex-row justify-center gap-2 text-sm'>
              <Link to='/log-in' className='text-primaryRed font-semibold'>Log In</Link>
              <span>|</span>
              <Link to='/forgot-password' className='text-primaryRed font-semibold'>Reset</Link>
            </div>
        </form>
      </div>
    </div>
  );
};

export default SingUp;