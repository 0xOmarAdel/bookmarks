const Input = ({ type, id, placeholder, value, onChange, icon: Icon }) => {
  return (
    <div className='relative'>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='w-full border border-gray-300 rounded py-1 pl-10 pr-2 outline-none'
      />
      <div className='absolute top-1/2 -translate-y-1/2 p-2 border border-gray-300 bg-gray-100 text-primaryRed'>
        <Icon />
      </div>
    </div>
  );
};

export default Input;