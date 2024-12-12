import Button from '../Elements/Button'

const CardProduct = (props) => {
  const { children, onClick } = props;
  return (
    <div className="sm:w-64 sm:max-w-xs bg-white border border-[#D1D5DB] rounded-lg w-full shadow mx-2 my-2 flex sm:flex-col sm:justify-between justify-around" onClick={onClick} >
      {children}
  </div>
  );
};

const Header = (props) => {
  const { path_gambar } = props;
  return (
    <div>
      <img className="sm:rounded-t-lg sm:p-4 p-2 sm:h-40 sm:w-full w-36 h-28 sm:object-cover object-center object-fill" src={path_gambar} alt="" />
    </div>
  );
};

const Body = (props) => {
  const { nama, harga } = props;
  return (
    <div className="sm:px-5 flex items-center sm:justify-between justify-start w-48">
      <div>
        <h5 className="sm:text-lg text-md font-bold tracking-tighter text-secondary">{nama.substring(0,20)}</h5>
        <span className="sm:text-lg text-sm font-bold text-secondary">{parseFloat(harga).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</span>
      </div>
    </div>
  );
};

const Footer = (props) => {
  const { onClick } = props;
   return (
    <div className="sm:px-5 sm:py-3 sm:mx-0 sm:mt-auto flex items-center h-full mx-2">
      <Button classname="bg-primary hover:bg-emerald-700 sm:px-4 sm:h-10 w-full text-sm sm:text-md" onClick={onClick}>Lihat detail</Button>
    </div>
   );
};

CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;

export default CardProduct;