const Button: React.FC = (props) => {
  let classes = 'w-full bg-primaryRed hover:bg-darkRed text-white font-bold py-1.5 px-4 rounded transition duration-500'
  if (props.className) {
    classes += ' ' + props.className;
  }

  return (
    <button className={classes} type='submit' >
      {props.text}
    </button>
  );
};

export default Button;