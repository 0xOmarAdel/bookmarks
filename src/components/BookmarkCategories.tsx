import BookmarkCategory from "./BookmarkCategory";
import useGetFirestoreData from "../hooks/useGetFirestoreData";
import { getAuth } from "firebase/auth";
import Loading from "./Loading";
import { useEffect } from "react";
import { toast } from "react-toastify";

type Props = {
  categories: { id: string; title: string }[];
  reFetchCategories: () => void;
};

const BookmarkCategories: React.FC<Props> = (props) => {
  const auth = getAuth();

  const {
    data: userBookmarks,
    isLoading: userBookmarksLoading,
    error: userBookmarksError,
  } = useGetFirestoreData("bookmarks", null, {
    lhs: "userId",
    op: "==",
    rhs: auth.currentUser!.uid,
  });

  useEffect(() => {
    if (userBookmarksError && !userBookmarksLoading) {
      toast.info("An error occurred with fetching your data!");
    }
  }, [userBookmarksError, userBookmarksLoading]);

  if (userBookmarksLoading) return <Loading />;

  const data = props.categories?.map((category) => {
    const bookmarks: { id: string; title: string; url: string }[] = [];
    userBookmarks?.map(
      (bookmark: {
        id: string;
        title: string;
        url: string;
        categoryId: string;
        userId: string;
      }) => {
        if (bookmark.categoryId === category.id) {
          bookmarks.push({
            id: bookmark.id,
            title: bookmark.title,
            url: bookmark.url,
          });
        }
      }
    );

    if (bookmarks.length > 0) {
      return {
        id: category.id,
        title: category.title,
        bookmarks,
      };
    }
  });

  const filteredArray = data?.filter((value) => value !== undefined);

  return (
    <>
      {filteredArray?.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
          {filteredArray?.map((category) => (
            <BookmarkCategory
              key={category!.id}
              id={category!.id}
              title={category!.title}
              bookmarks={category!.bookmarks}
              reFetchCategories={props.reFetchCategories}
            />
          ))}
        </div>
      ) : (
        <p className="mt-28 text-3xl text-gray-300 text-center">
          You don't have any{" "}
          <span className="text-primaryRed font-semibold">bookmarks</span> in
          your account yet!
        </p>
      )}
    </>
  );
};

export default BookmarkCategories;
