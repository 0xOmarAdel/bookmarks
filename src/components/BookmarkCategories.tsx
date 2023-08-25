import BookmarkCategory from './BookmarkCategory';
import useGetFirestoreData from '../hooks/useGetFirestoreData';
import {getAuth} from 'firebase/auth';
import Loading from './Loading';

type Props = {
  categories: { id: string; title: string }[];
};

const BookmarkCategories: React.FC<Props> = (props) => {
  const auth = getAuth();

  const {
    data: userBookmarks,
    isLoading: userBookmarksLoading,
    error: userBookmarksError,
    reFetchData: reFetchUserData
  } = useGetFirestoreData('bookmarks', null, { lhs: 'userId', op: '==', rhs: auth.currentUser!.uid });

  if (userBookmarksLoading) return <Loading />;

  const data = props.categories?.map(category => {
    const bookmarks: { id: string; title: string; url: string; }[] = [];
    userBookmarks?.map(bookmark => {
      if (bookmark.categoryId === category.id) {
        bookmarks.push({ id: bookmark.id, title: bookmark.title, url: bookmark.url })
      }
    });

    if (bookmarks.length > 0) {
      return {
        id: category.id,
        title: category.title,
        bookmarks
      }
    }

  })

  const filteredArray = data?.filter((value) => value !== undefined);

  return (
    <>
      {
      filteredArray?.length > 0 ?
        <div className='flex flex-row flex-wrap mr-0 md:-mr-10'>
          {
            filteredArray?.map(category =>
              <BookmarkCategory key={category.id} {...category} />
            )
          }
        </div>
      :
        <p className='mt-28 text-3xl text-center'>You don't have any <span className='text-primaryRed font-semibold'>bookmarks</span> in your account yet!</p>
      }
    </>
  );
};

export default BookmarkCategories;