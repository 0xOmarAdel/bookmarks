import BookmarkCategory from './BookmarkCategory';
import useGetFirestoreData from '../hooks/useGetFirestoreData';
import {getAuth} from 'firebase/auth';
import Loading from './Loading';

const BookmarkCategories = (props) => {
  const auth = getAuth();

  const {
    data: userBookmarks,
    isLoading: userBookmarksLoading,
    error: userBookmarksError,
    reFetchData: reFetchUserData
  } = useGetFirestoreData('bookmarks', null, { lhs: 'userId', op: '==', rhs: auth.currentUser!.uid });

  if (userBookmarksLoading) return <Loading />;

  const data = props.categories?.map(category => {
    const bookmarks = [];
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
    <div className='flex flex-row flex-wrap mr-0 md:-mr-10'>
      {
        filteredArray?.map(category =>
          <BookmarkCategory key={category.id} {...category} />
        )
      }
    </div>
  );
};

export default BookmarkCategories;