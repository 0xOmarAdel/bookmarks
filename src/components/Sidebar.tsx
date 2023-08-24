import { BsBookmark } from "react-icons/bs"; 
import { AiOutlineStar, AiOutlineFire, AiOutlineSearch, AiOutlineUser } from "react-icons/ai"; 
import { IoMdExit } from "react-icons/io"; 
import { Link } from "react-router-dom";
import { getAuth } from 'firebase/auth';

const Sidebar = () => {
  const logoutHandler = () => {
    try {
      const auth = getAuth();
      auth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='w-screen md:w-fit h-fit md:h-screen fixed md:static bottom-0 py-5 md:pt-16 md:pb-10 px-8 bg-white shadow-xl'>
      <h3 className='hidden md:flex flex-row items-center gap-2 mb-8 text-3xl text-primaryRed font-bold tracking-wide'>
        <span>Bookmarks</span>
      </h3>
      <ul className='flex flex-row md:flex-col items-center md:items-start justify-evenly gap-4'>
        <Link to='' className='text-lg tracking-wide'>
          <li className='flex flex-row items-center gap-2'>
            <AiOutlineStar className='text-2xl text-primaryRed' />
            <span className='hidden md:block'>Top Bookmarks</span>
          </li>
        </Link>
        <Link to='' className='text-lg tracking-wide'>
          <li className='flex flex-row items-center gap-2'>
            <AiOutlineFire className='text-2xl text-primaryRed' />
            <span className='hidden md:block'>New Bookmarks</span>
          </li>
        </Link>
        <Link to='' className='text-lg tracking-wide'>
          <li className='flex flex-row items-center gap-2'>
            <AiOutlineSearch className='text-2xl text-primaryRed' />
            <span className='hidden md:block'>Search</span>
          </li>
        </Link>
        <div className='hidden md:inline-block w-full h-0.5 bg-gray-200 my-3'></div>
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
        <li className='flex flex-row items-center gap-2 cursor-pointer' onClick={() => logoutHandler()}>
          <IoMdExit className='text-2xl text-primaryRed' />
          <span className='hidden md:block'>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;