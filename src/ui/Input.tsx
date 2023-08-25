const Input = ({ type, id, placeholder, value, onChange, icon: Icon }) => {
  return (
    <div className='relative'>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
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