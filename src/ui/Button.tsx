type Props = {
  className: string;
  text: string;
}

const Button: React.FC<Props> = (props) => {
  let classes =
    "w-full bg-primaryRed hover:bg-darkRed text-textLighter font-bold py-1.5 px-8 rounded transition duration-500";
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