import { useState, useEffect } from "react";
import Navbar from "../components/Fragments/Navbar";
import ItemCart from "../components/Fragments/ItemCart";
import Button from "../components/Elements/Button";
import Swal from "sweetalert2";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalHarga, setTotalHarga] = useState(0);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartData);

    const fetchProducts = async () => {
      try {
        const url = `https://bush-chivalrous-cornucopia.glitch.me`;
        const response = await fetch(url + "/api/menu");
    
        if (!response.ok) {
          throw new Error(`Error fetching products: ${response.statusText}`);
        }
    
        const data = await response.json();
    
        const updatedProducts = data.payload.datas.map((product) => ({
          ...product,
          harga: product.harga ? parseFloat(product.harga) : 0,
        }));
    
        setProducts(updatedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (cart.length > 0 && products.length > 0) {
      const total = cart.reduce((acc, item) => {
        const product = products.find((product) => product.id === item.id);
        if (product && !isNaN(product.harga)) {
          return acc + product.harga * item.qty;
        }
        return acc;
      }, 0);
      setTotalHarga(total);
    }
  }, [cart, products]);

  const updateCartQty = (productId, newQty) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        return { ...item, qty: newQty };
      }
      return item;
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQtyChange = (productId, action) => {
    const product = cart.find((item) => item.id === productId);
    const newQty = action === "increase" ? product.qty + 1 : product.qty - 1;

    if (newQty > 0) {
      updateCartQty(productId, newQty);
    }
  };

  const handleRemoveItem = (productId) => {
    Swal.fire({
      title: "Apakah Anda yakin ingin menghapus produk ini?",
      text: "Produk yang Anda pilih akan dihapus dari keranjang belanja Anda. Pastikan untuk memeriksa kembali.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Ya, hapus produk ini",
      cancelButtonText: "Tidak, batalkan"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Produk Berhasil Dihapus",
          text: "Produk yang Anda pilih telah berhasil dihapus dari keranjang belanja.",
          icon: "success",
          confirmButtonColor: "#10B981",
          confirmButtonText: "OK"
        });
      const updatedCart = cart.filter((item) => item.id !== productId);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    });
    
  };
  const handleOrderNow = () => {
    if (cart.length > 0) {
      Swal.fire({
        title: "Apakah Anda yakin ingin melanjutkan pemesanan?",
        text: "Pastikan semua produk yang Anda pilih sudah benar. Anda akan memesan produk ini.",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#10B981",
        cancelButtonColor: "#d33",
        confirmButtonText: "Iya, lanjutkan pemesanan",
        cancelButtonText: "Tidak, batalkan"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Terimakasih atas pesanan Anda!",
            text: "Pesanan Anda telah berhasil kami terima. Kami akan segera memprosesnya.",
            icon: "success",
            confirmButtonColor: "#10B981",
            confirmButtonText: "OK"
          });
          localStorage.removeItem("cart");
          setCart([]);
        }
      });
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex justify-center mt-20 mb-10">
        <div className="md:w-3/5 w-full mx-2">
          <h1 className="text-2xl font-bold mb-5 px-4">My Cart</h1>
          <div className="flex flex-col space-y-6">
            {cart.length > 0 &&
              cart.map((item) => {
                const product = products.find(
                  (product) => product.id === item.id
                );
                if (!product || isNaN(product.harga)) return null;
                const harga = product.harga;

                return (
                  <ItemCart
                    key={item.id}
                    className="border p-4 rounded-lg shadow-md flex justify-between items-center"
                  >
                    <ItemCart.Header
                      path_gambar={product.path_gambar}
                      nama={product.nama}
                    />
                    <ItemCart.Body
                      nama={product.nama}
                      harga={harga}
                      qty={item.qty}
                      onQtyChange={(action) => handleQtyChange(item.id, action)}
                    />
                    <ItemCart.Footer
                      onRemove={() => handleRemoveItem(item.id)}
                    />
                  </ItemCart>
                );
              })}
          </div>
          {cart.length > 0 ? (
            <div className="mt-6 text-right font-semibold gap-2 flex justify-end items-end flex-col mx-4">
            <span>
              Total: {totalHarga.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </span>
            <Button classname="bg-primary hover:bg-emerald-700" onClick={handleOrderNow}>Pesan Sekarang</Button>
          </div>) : ( <p className="text-center">Tidak ada produk dalam keranjang</p> )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
