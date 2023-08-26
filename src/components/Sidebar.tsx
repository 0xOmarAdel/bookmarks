import { BsBookmark } from "react-icons/bs"; 
import { AiOutlineUser } from "react-icons/ai"; 
import { IoMdExit } from "react-icons/io"; 
import { Link } from "react-router-dom";
import { getAuth } from 'firebase/auth';
import {toast} from 'react-toastify';

const Sidebar: React.FC = () => {
  const logoutHandler = async () => {
    try {
      const auth = getAuth();
      await auth.signOut();

      toast.info('You\'ve logged out successfully!')
    } catch (error) {
      toast.info('An error occurred while logging you out!')
    }
  }

  return (
    <div className='w-screen md:min-w-fit md:w-60 md:h-auto fixed bottom-0 md:top-0 z-50 py-5 md:pt-16 md:pb-10 px-8 bg-white shadow-xl'>
      <h3 className='hidden md:flex flex-row items-center gap-2 mb-8 text-3xl text-primaryRed font-bold tracking-wide'>
        <span>Bookmarks</span>
      </h3>
      <ul className='flex flex-row md:flex-col items-center md:items-start justify-evenly gap-4'>
        <Link to='/profile' className='text-lg tracking-wide'>
          <li className='flex flex-row items-center gap-2'>
            <AiOutlineUser className='text-2xl text-primaryRed' />
            <span className='hidden md:block'>My Profile</span>
          </li>
        </Link>
        <Link to='/bookmarks' className='text-lg tracking-wide'>
          <li className='flex flex-row items-center gap-2'>
            <BsBookmark className='text-xl text-primaryRed' />
            <span className='hidden md:block'>My Bookmarks</span>
          </li>
        </Link>
        <div className='hidden md:inline-block w-full h-0.5 bg-gray-200 my-3'></div>
        <li className='flex flex-row items-center gap-2 cursor-pointer' onClick={() => logoutHandler()}>
          <IoMdExit className='text-2xl text-primaryRed' />
          <span className='hidden md:block'>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;