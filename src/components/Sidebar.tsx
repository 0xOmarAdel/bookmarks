import { BsBookmark } from "react-icons/bs"; 
import { AiOutlineStar, AiOutlineFire, AiOutlineSearch, AiOutlineUser } from "react-icons/ai"; 
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className='w-screen md:w-fit h-fit md:h-screen fixed md:static bottom-0 py-5 md:pt-16 md:pb-10 px-8 bg-white shadow-xl'>
      <h3 className='hidden md:flex flex-row items-center gap-2 mb-8 text-3xl text-[#D9083A] font-bold tracking-wide'>
        <span>Bookmarks</span>
      </h3>
      <ul className='flex flex-row md:flex-col items-center md:items-start justify-evenly gap-4'>
        <Link to='' className='text-lg tracking-wide'>
          <li className='flex flex-row items-center gap-2'>
            <AiOutlineStar className='text-2xl text-[#D9083A]' />
            <span className='hidden md:block'>Top Bookmarks</span>
          </li>
        </Link>
        <Link to='' className='text-lg tracking-wide'>
          <li className='flex flex-row items-center gap-2'>
            <AiOutlineFire className='text-2xl text-[#D9083A]' />
            <span className='hidden md:block'>New Bookmarks</span>
          </li>
        </Link>
        <Link to='' className='text-lg tracking-wide'>
          <li className='flex flex-row items-center gap-2'>
            <AiOutlineSearch className='text-2xl text-[#D9083A]' />
            <span className='hidden md:block'>Search</span>
          </li>
        </Link>
        <div className='hidden md:inline-block w-full h-0.5 bg-gray-200 my-3'></div>
        <Link to='' className='text-lg tracking-wide'>
          <li className='flex flex-row items-center gap-2'>
            <AiOutlineUser className='text-2xl text-[#D9083A]' />
            <span className='hidden md:block'>My Profile</span>
          </li>
        </Link>
        <Link to='' className='text-lg tracking-wide'>
          <li className='flex flex-row items-center gap-2'>
            <BsBookmark className='text-xl text-[#D9083A]' />
            <span className='hidden md:block'>My Bookmarks</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;