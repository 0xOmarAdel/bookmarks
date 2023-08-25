import Card from "../ui/Card";
import BookmarkCategoryIcon from "./BookmarkCategoryIcon";
import BookmarkCategoryItem from "./BookmarkCategoryItem";

type Props = {
  title: string;
  bookmarks: { id: string; title: string; url: string; }[];
}

const BookmarkCategory: React.FC<Props> = (props) => {
  console.log(props)
  return (
    <div className="basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pb-10 md:bp-0 md:pr-10">
      <Card className='w-full !text-left'>
      <div className='flex flex-row items-center gap-3 mb-5 text-primaryRed font-semibold'>
        <BookmarkCategoryIcon categoryTitle={props.title} />
        <h3 className='text-2xl capitalize whitespace-nowrap'>{props.title}</h3>
      </div>
      <ul className='flex flex-col gap-3 text-xl capitalize'>
        {
          props.bookmarks.map(bookmark =>
            <BookmarkCategoryItem key={bookmark.id} bookmark={bookmark} />
          )
        }
      </ul>
    </Card>
    </div>
  );
};

export default BookmarkCategory;