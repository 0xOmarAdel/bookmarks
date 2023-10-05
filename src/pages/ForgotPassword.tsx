import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import Button from "../ui/Button";
import {Link} from 'react-router-dom';
import Input from "../ui/Input";
import { AiOutlineMail } from "react-icons/ai";
import {toast} from 'react-toastify';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);

      toast.info('Reset password email sent successfully!')
    } catch (error) {
      toast.info('An error occurred!')
    }
  }

  return (
    <div className="h-screen flex justify-center items-center mx-4">
      <div className="max-w-md bg-primarylessDark shadow-lg rounded px-8 pt-6 pb-8">
        <h3 className="mb-8 text-3xl text-primaryRed text-center font-bold tracking-wide">
          Reset Password
        </h3>
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <div className="w-full">
            <Input
              id="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(newValue) => setEmail(newValue)}
              icon={AiOutlineMail}
            />
          </div>
          <Button text="Reset" className="mt-4 mb-2" />
          <div className="flex flex-row justify-center gap-2 text-sm">
            <Link to="/log-in" className="text-primaryRed font-semibold">
              Log In
            </Link>
            <span className="text-primarylessDarker">|</span>
            <Link to="/sign-up" className="text-primaryRed font-semibold">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;