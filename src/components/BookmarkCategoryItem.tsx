const BookmarkCategoryItem = ({ bookmark }) => {
  return (
    <li key={bookmark.id}>
      <a
        href={bookmark.url}
        target='_blank'
        className='whitespace-nowrap transition duration-500 hover:text-primaryRed'
      >
        {bookmark.title}
      </a>
    </li>
  );
};

export default BookmarkCategoryItem;