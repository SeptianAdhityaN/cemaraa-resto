const ItemCart = (props) => {
  const { children } = props;
  return (
    <div className="border p-4 rounded-lg shadow-md flex justify-between items-center">
      {children}
    </div>
  );
};

const ItemCartHeader = (props) => {
  const { path_gambar, nama } = props;
  return (
    <div className="flex">
      <img
        src={path_gambar || "/images/default.jpg"}
        alt={nama}
        className="w-24 h-24 object-cover rounded-md"
      />
    </div>
  );
};

const ItemCartBody = (props) => {
  const { nama, harga, qty, onQtyChange } = props;
  return (
    <div className="flex-grow ml-4">
      <h3 className="font-semibold text-lg">{nama}</h3>
      <p className="text-gray-500">{harga.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
      <div className="flex justify-between items-center mt-4 ap-2">
        <div className="flex items-center">
          <button className="bg-primary hover:bg-emerald-700 text-2xl text-center py-1 px-3 text-white" onClick={() => onQtyChange('decrease')}>-</button>
          <span className="mx-4">{qty}</span>
          <button className="bg-primary hover:bg-emerald-700 text-2xl text-center py-1 px-3 text-white" onClick={() => onQtyChange('increase')}>+</button>
        </div>
        <p className="font-bold">{(harga * qty).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
      </div>
    </div>
  );
};

const ItemCartFooter = (props) => {
  const { onRemove } = props;
  return (
    <button
      onClick={onRemove}
      className="text-red-500 hover:bg-red-700 hover:text-white duration-500 text-3xl rounded-full px-2 py-1"
    >
      <ion-icon name="trash-outline"></ion-icon>
    </button>
  );
};

ItemCart.Header = ItemCartHeader;
ItemCart.Body = ItemCartBody;
ItemCart.Footer = ItemCartFooter;

export default ItemCart;