import { IconType } from 'react-icons';

type Props = {
  type: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  icon: IconType;
}
const Input: React.FC<Props> = ({ type, id, placeholder, value, onChange, icon: Icon }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className='relative'>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        className='w-full border border-gray-300 rounded py-2 pl-12 pr-2 outline-none'
        autoComplete='off'
      />
      <div className='absolute top-0 px-2 h-full border border-gray-300 rounded-l bg-gray-100 text-xl text-primaryRed'>
        <Icon className='translate-y-1/2' />
      </div>
    </div>
  );
};

export default Input;