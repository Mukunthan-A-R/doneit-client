const MenuItem = ({ text, className = "" }) => {
  return (
    <li className={`py-2 px-4 ${className}`}>
      <p className="py-1 font-sans font-medium text-white ">{text}</p>
    </li>
  );
};

export default MenuItem;
