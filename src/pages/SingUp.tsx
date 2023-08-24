import { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from '../firebase';
import Button from '../ui/Button';
import {Link} from 'react-router-dom';

const SingUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      updateProfile(auth.currentUser!,{
        displayName: name
      });
      const user = userCredential.user;
      const data = {
        name,
        email,
        timestamp: serverTimestamp()
      };
      await setDoc(doc(db, 'users', user.uid), data);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h3 className='mb-8 text-3xl text-primaryRed text-center font-bold tracking-wide'>Sign Up</h3>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            <Button text='Sign Up' className='mb-4' />
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