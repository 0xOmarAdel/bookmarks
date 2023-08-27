import { BiDumbbell, BiBook, BiBookmark } from "react-icons/bi";
import { SiProbot } from "react-icons/si";
import { AiOutlineFileText, AiOutlineFolderOpen } from "react-icons/ai";
import { FaGraduationCap, FaRegMoneyBillAlt, FaLanguage, FaDev } from "react-icons/fa";
import { GiPirateFlag } from "react-icons/gi";
import { HiOutlineCode } from "react-icons/hi";
import { FiShoppingCart } from "react-icons/fi";
import { VscKey } from "react-icons/vsc";
import { BsController, BsPeople, BsGear } from "react-icons/bs";

type Props = {
  categoryTitle: string;
}

const BookmarkCategoryIcon : React.FC<Props> = (props) => {
  switch (props.categoryTitle.toLocaleLowerCase()) {
    case 'ai':
      return  <SiProbot className='text-2xl' />;
    case 'books':
      return  <BiBook className='text-2xl' />;
    case 'challenges':
      return  <BiDumbbell className='text-2xl' />;
    case 'courses':
      return  <FaGraduationCap className='text-2xl' />;
    case 'docs':
      return  <AiOutlineFileText className='text-2xl' />;
    case 'freelancing':
      return  <FaRegMoneyBillAlt className='text-2xl' />;
    case 'gaming':
      return  <BsController className='text-2xl' />;
    case 'languages':
      return  <FaLanguage className='text-2xl' />;
    case 'libraries':
      return  <AiOutlineFolderOpen className='text-2xl' />;
    case 'piracy':
      return  <GiPirateFlag className='text-2xl' />;
    case 'programming':
      return  <HiOutlineCode className='text-2xl' />;
    case 'shopping':
      return  <FiShoppingCart className='text-2xl' />;
    case 'shortcuts':
      return  <VscKey className='text-2xl' />;
    case 'social media':
      return  <BsPeople className='text-2xl' />;
    case 'tools':
      return  <BsGear className='text-2xl' />;
    default:
      return  <BiBookmark className='text-2xl' />;
  }
};

export default BookmarkCategoryIcon;