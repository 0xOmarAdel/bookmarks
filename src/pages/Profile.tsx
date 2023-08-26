import { useEffect, useState } from "react";
import Button from "../ui/Button";
import useGetFirestoreData from "../hooks/useGetFirestoreData";
import { getAuth, updateEmail, updatePassword, updateProfile, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import Loading from "../components/Loading";
import { db } from "../firebase";
import Card from "../ui/Card";
import Input from "../ui/Input";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { VscKey } from "react-icons/vsc";
import {toast} from 'react-toastify';

const Profile: React.FC = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const {
    data: userData,
    isLoading: userDataLoading,
    error: userDataError,
    reFetchData: reFetchUserData
  } = useGetFirestoreData('users', auth.currentUser!.uid);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword1, setCurrentPassword1] = useState('');
  const [currentPassword2, setCurrentPassword2] = useState('');
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  
  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setEmail(userData.email);
    }
  }, [userData])

  useEffect(() => {
    if (userDataError && !userDataLoading) {
      toast.info('An error occurred with fetching your data!')
    }
  }, [userDataError, userDataLoading])
  
  if (userDataLoading) return <Loading />;

  const submitHandler = async (event: React.FormEvent) => {
    try {
      event.preventDefault();

      await updateProfile(auth.currentUser!, {
        displayName: firstName
      });

      const credential = EmailAuthProvider.credential(user!.email!, currentPassword1);

      await reauthenticateWithCredential(user!, credential);
      await updateEmail(user!, email)

      const docRef = doc(db, 'users', auth.currentUser!.uid);
      await updateDoc(docRef, {
        firstName,
        lastName,
        email,
      });

      reFetchUserData();
      toast.info('Updated your profile successfully!')
    } catch (error) {
      toast.info('An error occurred while updating your data!')
    }
  }

  const changePasswordHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newPassword1 !== newPassword2) {
      toast.info('Both passwords need to match!')
    } else if (newPassword1.length < 6) {
      toast.info('New password should be at least 6 characters!')
    } else {
      const credential = EmailAuthProvider.credential(user!.email!, currentPassword2);
      await reauthenticateWithCredential(user!, credential);

      updatePassword(auth.currentUser!, newPassword1).then(() => {
        toast.info('Changed your password successfully!')
      }).catch((error) => {
        console.log(error)
        toast.info('An error occurred while changing your password!')
      });
    }
  };

  return (
    <div className='flex flex-col lg:flex-row gap-12'>
      <Card title='Account Info' className='w-full'>
        <form onSubmit={submitHandler} className='grid xl:grid-cols-2 gap-6'>
          <div className='w-full'>
            <Input id='first-name' type='text' placeholder='First Name' value={firstName} onChange={(newValue) => setFirstName(newValue)} icon={AiOutlineUser} />
          </div>            
          <div className='w-full'>
            <Input id='last-name' type='text' placeholder='Last Name' value={lastName} onChange={(newValue) => setLastName(newValue)} icon={AiOutlineUser} />
          </div>
          <div className='w-full'>
            <Input id='email' type='text' placeholder='Last Name' value={email} onChange={(newValue) => setEmail(newValue)} icon={AiOutlineMail} />
          </div>            
          <div className='w-full'>
            <Input id='current-password1' type='password' placeholder='Current Password' value={currentPassword1} onChange={(newValue) => setCurrentPassword1(newValue)} icon={VscKey} />
          </div>
          <Button text='Save Changes' className='mx-auto xl:mx-0' />
        </form>
      </Card>
      <Card title='Change Password' className='w-full'>
        <form onSubmit={changePasswordHandler} className='grid xl:grid-cols-2 gap-6'>
          <div className='w-full'>
            <Input id='current-password2' type='password' placeholder='Current Password' value={currentPassword2} onChange={(newValue) => setCurrentPassword2(newValue)} icon={VscKey} />
          </div>            
          <div className='w-full'>
            <Input id='new-password1' type='password' placeholder='New Password' value={newPassword1} onChange={(newValue) => setNewPassword1(newValue)} icon={VscKey} />
          </div>
          <div className='w-full'>
            <Input id='new-password2' type='password' placeholder='Repeat New Password' value={newPassword2} onChange={(newValue) => setNewPassword2(newValue)} icon={VscKey} />
          </div>
          <Button text='Save Changes' className='mx-auto xl:mx-0' />
        </form>
      </Card>
    </div>
  );
};

export default Profile;