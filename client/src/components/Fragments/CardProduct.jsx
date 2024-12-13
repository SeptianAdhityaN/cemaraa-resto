import Button from "../Elements/Button";

const CardProduct = (props) => {
  const { children } = props;
  return (
    <div
      className="bg-white border border-gray-300 rounded-lg shadow-md flex items-center w-full p-2 sm:p-0 transition-transform transform hover:scale-105 hover:shadow-lg sm:px-2 sm:py-2 sm:flex-col sm:w-64 sm:max-w-xs max-w-full"
    >
      {children}
    </div>
  );
};

const Header = (props) => {
  const { path_gambar, nama } = props;
  return (
    <div className="flex-shrink-0 w-16 h-16 sm:w-full sm:h-40 overflow-hidden rounded-lg sm:rounded-none sm:rounded-t-lg">
      <img
        className="w-full h-full object-cover max-w-full transition-transform transform hover:scale-110 sm:h-40"
        src={path_gambar}
        alt={nama}
      />
    </div>
  );
};

const Body = (props) => {
  const { nama, harga } = props;
  return (
    <div className="flex-grow sm:flex sm:flex-col sm:justify-between sm:items-start w-full px-4 sm:py-3">
      <h5 className="text-md font-semibold text-gray-800 truncate text-md">
        {nama.substring(0, 20)}
      </h5>
      <p className="text-sm text-gray-600 font-medium mt-1">
        {parseFloat(harga).toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        })}
      </p>
    </div>
  );
};

const Footer = (props) => {
  const { onClick, onAddToCart } = props;
  return (
    <div className="flex items-center sm:px-4 sm:py-3 sm:mt-auto sm:justify-around sm:w-full">
      <Button
        classname="bg-primary text-white text-xs py-2 px-2 sm:h-8 sm:w-full rounded-md hover:bg-emerald-700 hidden sm:block"
        onClick={onClick}
      >
        Lihat Detail
      </Button>
      <Button
        classname="flex justify-center items-center bg-primary text-white text-sm py-1 px-1 rounded-md hover:bg-emerald-700 sm:hidden"
        onClick={onClick}
      >
        <ion-icon name="reader-outline"></ion-icon>
      </Button>
      <div
        className="pl-2 cursor-pointer text-primary text-center text-lg hover:text-emerald-700 flex justify-center items-center"
        onClick={onAddToCart}
      >
        <ion-icon name="cart-outline"></ion-icon>
      </div>
    </div>
  );
};

CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;

export default CardProduct;
