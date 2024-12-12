const Button = (props) => {
  const { children, classname = "bg-primary", onClick, type = "button" } = props;
  return (
    <button
      className={`h-10 px-6 ${classname} duration-500 text-white font-semibold rounded shadow-md`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
