type Props = {
  bookmark: { id: string; title: string; url: string }
}

const BookmarkCategoryItem: React.FC<Props> = (props) => {
  return (
    <li key={props.bookmark.id}>
      <a
        href={props.bookmark.url}
        target='_blank'
        className='whitespace-nowrap transition duration-500 hover:text-primaryRed'
      >
        {props.bookmark.title}
      </a>
    </li>
  );
};

export default BookmarkCategoryItem;