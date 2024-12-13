import CardProduct from "../components/Fragments/CardProduct";
import { useEffect, useState } from "react";
import Navbar from "../components/Fragments/Navbar.jsx";
import Banner from "../components/Fragments/Banner";
import Button from "../components/Elements/Button/index.jsx";
import Footer from "../components/Fragments/Footer.jsx";
import Swal from "sweetalert2";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["Semua", "Makanan", "Minuman"];

  const fetchProducts = async () => {
    setIsLoading(true);
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

      setAllProducts(updatedProducts);
      setProducts(updatedProducts);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (!searchQuery.trim()) {
      setProducts(allProducts);
      return;
    }

    try {
      const url = `https://bush-chivalrous-cornucopia.glitch.me`;
      const response = await fetch(
        url + `/api/menu?search=${searchQuery.toLowerCase()}`
      );

      if (!response.ok) {
        throw new Error(`Error fetching search prodcut`);
      }
      const data = await response.json();
      const updatedProducts = data.payload.datas.map((product) => ({
        ...product,
        harga: product.harga ? parseFloat(product.harga) : 0,
      }));
      setProducts(updatedProducts);
      setIsLoading(false);
    } catch (err) {
      console.error("Error during search", err);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setIsLoading(true);

    if (category === "Semua") {
      setProducts(allProducts);
      setIsLoading(false);
      return;
    }
    const url = `https://bush-chivalrous-cornucopia.glitch.me`;
    fetch(url + `/api/menu?kategori=${category.toLowerCase()}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.payload || !Array.isArray(data.payload.datas)) {
          throw new Error("Invalid data structure");
        }

        const updatedProducts = data.payload.datas.map((product) => ({
          ...product,
          harga: product.harga ? parseFloat(product.harga) : 0,
        }));

        setProducts(updatedProducts);
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleAddToCart = (id, nama) => {
    Toast.fire({
      icon: "success",
      title: `Berhasil menambahkan ${nama} ke keranjang`,
    });
    setCart((prevCart) => {
      const itemExist = prevCart.find((item) => item.id === id);

      let updatedCart;
      if (itemExist) {
        updatedCart = prevCart.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        updatedCart = [
          ...prevCart,
          {
            id,
            qty: 1,
          },
        ];
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const images = ["/images/banner.jpeg", "/images/banner.jpeg"];

  return (
    <div className="bg-background flex flex-col items-center">
      <Navbar />

      <Banner images={images} />

      <div className="flex flex-col sm:flex-row justify-center mt-5 w-full px-5 sm:px-10">
        <div className="form-control sm:w-[50%] w-full block">
          <input
            type="text"
            placeholder="Cari produk..."
            className="px-4 py-2 rounded-md input-bordered w-full shadow sm:h-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          classname="bg-primary hover:bg-emerald-700 mt-2 sm:mt-0 sm:ml-2 sm:px-4 sm:h-10 w-full sm:w-20 text-sm sm:text-md"
          onClick={handleSearch}
        >
          Cari
        </Button>
      </div>

      <div className="flex justify-center mt-5 flex-wrap gap-2 px-2 sm:px-5">
        {categories.map((category, index) => (
          <Button
            key={index}
            classname={`${
              selectedCategory === category
                ? "bg-primary"
                : "bg-gray-500 hover:bg-emerald-700"
            } text-white p-2 rounded-md`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center mt-5 flex-wrap px-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="w-40 sm:w-52 m-2">
              <div className="skeleton h-32 sm:h-40 w-full"></div>
              <div className="skeleton h-4 w-28 mt-2"></div>
              <div className="skeleton h-4 w-full mt-1"></div>
              <div className="skeleton h-4 w-full mt-1"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center my-5 flex-wrap px-5">
          {products.map((product) => (
            <CardProduct key={product.id} className="w-40 sm:w-52 m-2">
              <CardProduct.Header
                path_gambar={product.path_gambar}
                nama={product.nama}
              />
              <CardProduct.Body nama={product.nama} harga={product.harga} />
              <CardProduct.Footer
                onClick={() => handleProductClick(product)}
                onAddToCart={() => handleAddToCart(product.id, product.nama)}
              />
            </CardProduct>
          ))}
        </div>
      )}

      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-5 rounded-md w-full sm:w-3/4 md:w-1/2">
            <h2 className="text-xl sm:text-2xl font-bold">
              {selectedProduct.nama}
            </h2>
            <img
              src={selectedProduct.path_gambar}
              alt={selectedProduct.nama}
              className="my-3 w-full"
            />
            <p>{selectedProduct.deskripsi}</p>
            <p className="font-semibold mt-2">
              Harga:{" "}
              {selectedProduct.harga.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <Button
                onClick={handleCloseModal}
                classname="bg-red-500 hover:bg-red-700 w-full sm:w-1/2"
              >
                Kembali
              </Button>
              <Button
                classname="bg-primary hover:bg-emerald-700 w-full sm:w-1/2"
                onClick={() =>
                  handleAddToCart(selectedProduct.id, selectedProduct.nama)
                }
              >
                Pesan
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductsPage;
