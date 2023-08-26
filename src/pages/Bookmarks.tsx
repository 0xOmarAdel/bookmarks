import BookmarkCategories from "../components/BookmarkCategories";
import useGetFirestoreData from '../hooks/useGetFirestoreData';
import Loading from "../components/Loading";
import NewBookmarkForm from '../components/NewBookmarkForm';
import { useEffect } from "react";
import {toast} from 'react-toastify';

const Bookmarks: React.FC = () => {
  const {
    data: categoriesData,
    isLoading: categoriesDataLoading,
    error: categoriesDataError,
    reFetchData: reFetchCategoriesData
  } = useGetFirestoreData('categories', null, null, 'title', 'asc');

  useEffect(() => {
    if (categoriesDataError && !categoriesDataLoading) {
      toast.info('An error occurred with fetching your data!')
    }
  }, [categoriesDataError, categoriesDataLoading])
  

  if (categoriesDataLoading) return <Loading />;

  return (
    <>
      <NewBookmarkForm categories={categoriesData} reFetchCategories={reFetchCategoriesData} />
      <BookmarkCategories categories={categoriesData} reFetchCategories={reFetchCategoriesData} />
    </>
  );
};

export default Bookmarks;