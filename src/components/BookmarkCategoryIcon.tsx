import { BiBook, BiBookmark } from "react-icons/bi";
import { TiDocumentText } from "react-icons/ti";
import { CgGames } from "react-icons/cg";
import { FaGraduationCap, FaRegMoneyBillAlt, FaLanguage, FaDev } from "react-icons/fa";
import { GiPirateFlag } from "react-icons/gi";
import { FiShoppingCart } from "react-icons/fi";
import { BsPeople } from "react-icons/bs";

type Props = {
  categoryTitle: string;
}

const BookmarkCategoryIcon : React.FC<Props> = (props) => {
  switch (props.categoryTitle) {
    case 'books':
      return  <BiBook className='text-2xl' />;
    case 'courses':
      return  <FaGraduationCap className='text-2xl' />;
    case 'docs':
      return  <TiDocumentText className='text-2xl' />;
    case 'freelancing':
      return  <FaRegMoneyBillAlt className='text-2xl' />;
    case 'gaming':
      return  <CgGames className='text-2xl' />;
    case 'languages':
      return  <FaLanguage className='text-2xl' />;
    case 'piracy':
      return  <GiPirateFlag className='text-2xl' />;
    case 'programming':
      return  <FaDev className='text-2xl' />;
    case 'shopping':
      return  <FiShoppingCart className='text-2xl' />;
    case 'social media':
      return  <BsPeople className='text-2xl' />;
    default:
      return  <BiBookmark className='text-2xl' />;
  }
};

export default BookmarkCategoryIcon;