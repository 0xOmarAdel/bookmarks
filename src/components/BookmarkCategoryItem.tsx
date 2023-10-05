import { deleteDoc, doc } from "firebase/firestore";
import { FiTrash2 } from "react-icons/fi";
import { db } from "../api/firebase";
import { toast } from "react-toastify";

type Props = {
  bookmark: { id: string; title: string; url: string };
  reFetchCategories: () => void;
};

const BookmarkCategoryItem: React.FC<Props> = (props) => {
  const deleteHandler = async () => {
    try {
      await deleteDoc(doc(db, "bookmarks", props.bookmark.id));

      toast.info("Bookmark deleted successfully!");
      props.reFetchCategories();
    } catch (error) {
      toast.info("An error occurred while deleting this bookmark!");
    }
  };

  return (
    <li
      key={props.bookmark.id}
      className="flex flex-row items-center gap-4 group"
    >
      <a
        href={props.bookmark.url}
        target="_blank"
        className="whitespace-nowrap transition duration-500 hover:text-primaryRed"
      >
        {props.bookmark.title}
      </a>
      <FiTrash2
        className="text-lg opacity-0 cursor-pointer transition-all duration-500 hover:text-primaryRed group-hover:opacity-90"
        onClick={deleteHandler}
      />
    </li>
  );
};

export default BookmarkCategoryItem;
