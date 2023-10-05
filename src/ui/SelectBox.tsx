import { useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io';
import useClickOutside from '../hooks/useClickOutside';

type Props = {
  list: { id: string, text: string }[];
  selected: { id: string, text: string };
  onSelect: (item: { id: string, text: string }) => void;
}

const SelectBox: React.FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHandler = () => {
    setIsOpen(prevState => !prevState);
  };

  const changeHandler = (item: { id: string, text: string }) => {
    props.onSelect(item);
    setIsOpen(false);
  };

  const onClickOutside = () => {
    setIsOpen(false);
  };

  const selectBoxRef = useClickOutside(onClickOutside);

  const divClasses =
    "flex flex-row items-center justify-between gap-3 rounded-sm py-0.5 pl-5 pr-2 text-xl cursor-pointer overflow-hidden shadow-md transition duration-500 hover:shadow-md hover:shadow-primarylessDarker";
  const iconClasses = "text-lg text-textLighter transition duration-500";
  let ulClasses =
    "w-fit absolute z-50 bg-primarylessDark mt-3 text-lg shadow-slate-100 opacity-0 transition duration-500";
  const liClasses =
    "w-full py-1 px-5 text-textLighter capitalize select-none whitespace-nowrap transition-all duration-500";

  const [visibility, setVisibility] = useState('invisible')

  if (visibility == 'invisible') {
    ulClasses += ' invisible';
  }

  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => {
        setVisibility('invisible');
      }, 500);
    
      return () => {
        clearTimeout(timeout);
      }
    } else {
      setVisibility('');
    }
  }, [isOpen])
  

  return (
    <div
      className="w-fit relative tracking-wide"
      ref={selectBoxRef as React.RefObject<HTMLDivElement>}
    >
      <div
        className={
          isOpen
            ? divClasses + " shadow-md shadow-primarylessDarker"
            : divClasses
        }
        onClick={toggleHandler}
      >
        <span className="text-textLighter capitalize select-none">
          {props.selected?.text}
        </span>
        <IoIosArrowDown
          className={isOpen ? iconClasses + " rotate-180" : iconClasses}
        />
      </div>

      <ul
        className={
          isOpen
            ? ulClasses + " !shadow-md !shadow-primarylessDarker !opacity-100"
            : ulClasses
        }
      >
        {props.list
          .filter((listItem) => listItem?.id !== props.selected?.id)
          .map((listItem) => (
            <li
              key={listItem.id}
              className={
                isOpen
                  ? liClasses +
                    " opacity-100 cursor-pointer hover:bg-primaryRed hover:text-white"
                  : liClasses
              }
              onClick={isOpen ? () => changeHandler(listItem) : () => {}}
            >
              {listItem.text}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default SelectBox