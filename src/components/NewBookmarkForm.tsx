import Card from '../ui/Card';
import Button from '../ui/Button';
import SelectBox from '../ui/SelectBox';
import Input from '../ui/Input';
import {AiOutlineFileText, AiOutlineLink} from 'react-icons/ai';
import {addDoc, collection} from 'firebase/firestore';
import {db} from '../firebase';
import {useEffect, useState} from 'react';
import { getAuth } from 'firebase/auth';
import {toast} from 'react-toastify';

type Props = {
  categories: { id: string; title: string }[];
  reFetchCategories: () => void;
};

const NewBookmarkForm: React.FC<Props> = ({ categories, reFetchCategories }) => {
  const auth = getAuth();

  const list = categories?.map(category => {
    return { id: category.id, text: category.title }
  }) || [];

  useEffect(() => {
    if (categories) {
      const list = categories?.map(category => {
        return { id: category.id, text: category.title }
      }) || [];
      setCategory(list[0])
    }
  }, [categories])
  
  const [category, setCategory] = useState<{ id: string; text: string }>();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const submitHandler = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      await addDoc(collection(db, 'bookmarks'), {
        title,
        url,
        categoryId: category!.id,
        userId: auth.currentUser!.uid
      });

      toast.info('Bookmark added successfully!')
      reFetchCategories();
      setTitle('');
      setUrl('');
    } catch (error) {
      toast.info('An error occurred while adding your bookmark!')
    }
  };

  return (
    <Card className='!w-full mb-12 !text-left' title='Add Bookmark'>
      <form onSubmit={submitHandler} className="flex flex-col xl:flex-row xl:items-center gap-6">
        <div className='flex flex-col lg:flex-row gap-6'>
          <Input id='title' type='text' placeholder='Title' value={title} onChange={(newValue) => setTitle(newValue)} icon={AiOutlineFileText} />
          <Input id='url' type='text' placeholder='Url' value={url} onChange={(newValue) => setUrl(newValue)} icon={AiOutlineLink} />
        </div>
        <div className='flex flex-row gap-6'>
          <SelectBox list={list} selected={category!} onSelect={setCategory} />
          <Button text='Submit' className='!w-fit px-12' />
        </div>
      </form>
    </Card>
  );
};

export default NewBookmarkForm;