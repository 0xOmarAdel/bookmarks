const Card = (props) => {
  let classes = 'w-1/2 h-fit bg-white shadow-lg rounded px-8 pt-6 pb-8 text-center'
  if (props.className) {
    classes += ' ' + props.className;
  }

  return (
    <div className={classes}>
      <h3 className='mb-5 text-3xl text-primaryRed font-semibold'>{props.title}</h3>
      {props.children}
    </div>
  );
};

export default Card;