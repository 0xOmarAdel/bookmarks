import BookmarkCategories from "../components/BookmarkCategories";
import useGetFirestoreData from '../hooks/useGetFirestoreData';
import Loading from "../components/Loading";
import NewBookmarkForm from '../components/NewBookmarkForm';
import { useEffect } from "react";

const Bookmarks: React.FC = () => {
  const {
    data: categoriesData,
    isLoading: categoriesDataLoading,
    error: categoriesDataError,
    reFetchData: reFetchCategoriesData
  } = useGetFirestoreData('categories', null, null, 'title', 'asc', null);

  useEffect(() => {
    if (categoriesDataError && !categoriesDataLoading) {
      console.log('error')
    }
  }, [categoriesDataError, categoriesDataLoading])
  

  if (categoriesDataLoading) return <Loading />;

  return (
    <>
      <NewBookmarkForm categories={categoriesData} reFetchCategories={reFetchCategoriesData} />
      <BookmarkCategories categories={categoriesData} />
    </>
  );
};

export default Bookmarks;