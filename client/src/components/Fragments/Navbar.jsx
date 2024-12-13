import { Link, useNavigate } from "react-router-dom";
import Button from "../Elements/Button";
import { useState, useEffect } from "react";

const Navbar = (props) => {
  const { onClick } = props;
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  const [cart, setCart] = useState([]);
  const [totalHarga, setTotalHarga] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);

    const fetchProducts = async () => {
      try {
        const url = 'https://bush-chivalrous-cornucopia.glitch.me';
        const response = await fetch(url + '/api/menu')

        if (!response.ok) {
          throw new Error(response.status);
        }
        const data = await response.json();
        const updatedProducts = data.payload.datas.map((product) => ({
          ...product,
          harga: product.harga ? parseFloat(product.harga) : 0,
        }));
        setProducts(updatedProducts);
        
        const total = storedCart.reduce((acc, item) => {
          const product = updatedProducts.find((prod) => prod.id === item.id);
          if (product && !isNaN(product.harga)) {
            return acc + (product.harga * item.qty);
          }
          return acc;
        }, 0);

        setTotalHarga(total);
      } catch (err) {
        console.log('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  const cartItemCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");

    navigate("/login");
  };

  return (
    <div className="navbar bg-secondary shadow-lg fixed top-0 w-full z-10">
      <Link to="/" className="flex-1">
        <img className="w-8 h-8 rounded-full" src="/images/logo.jpeg" alt="Logo Cemaraa Resto" />
        <h2 className="btn btn-ghost hover:bg-transparent text-xl text-white font-bold tracking-tighter">CemaraaResto.</h2>
      </Link>

      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <i></i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">{cartItemCount}</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">{cartItemCount} Items</span>
              <span className="text-info">
                Subtotal: Rp {totalHarga.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
              </span>
              <div className="card-actions">
                <Link to="/cart" className="btn bg-primary hover:bg-emerald-700 text-white btn-block">Lihat Kerajang</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Foto Profile"
                src="https://i.pinimg.com/236x/91/3b/71/913b71d1adb5af6ba8cc951600baec3e.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li className="font-bold text-lg pt-2">{username}</li>
            <li className="text-sm border-b pb-2">{email}</li>
            <li>
              <a className="justify-between">
                Profile
                <span className="badge bg-ascent">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <Button classname="bg-red-500 hover:bg-red-700 h-8 my-2 w-full" onClick={handleLogout}>Logout</Button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
