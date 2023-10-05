import Card from "../ui/Card";
import ScrollableDiv from "../ui/ScrollableDiv";
import BookmarkCategoryIcon from "./BookmarkCategoryIcon";
import BookmarkCategoryItem from "./BookmarkCategoryItem";

type Props = {
  id: string;
  title: string;
  bookmarks: { id: string; title: string; url: string; }[];
  reFetchCategories: () => void;
}

const BookmarkCategory: React.FC<Props> = (props) => {
  return (
    <Card className="!w-full pb-10 md:bp-0!text-left">
      <div className="flex flex-row items-center gap-3 mb-5 text-primaryRed font-semibold">
        <BookmarkCategoryIcon categoryTitle={props.title} />
        <h3 className="text-2xl capitalize whitespace-nowrap">{props.title}</h3>
      </div>
      <ScrollableDiv className="max-h-80">
        <ul className="flex flex-col gap-3 text-xl text-textLighter capitalize">
          {props.bookmarks.map((bookmark) => (
            <BookmarkCategoryItem
              key={bookmark.id}
              bookmark={bookmark}
              reFetchCategories={props.reFetchCategories}
            />
          ))}
        </ul>
      </ScrollableDiv>
    </Card>
  );
};

export default BookmarkCategory;