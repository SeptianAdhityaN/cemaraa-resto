import CardProduct from "../components/Fragments/CardProduct";
import { useEffect, useState } from "react";
import Navbar from "../components/Fragments/Navbar.jsx";
import Banner from "../components/Fragments/Banner";
import Button from "../components/Elements/Button/index.jsx";
import Footer from "../components/Fragments/Footer.jsx";
import Swal from 'sweetalert2';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ["Semua", "Makanan", "Minuman"];

  const fetchProducts = async () => {
    try {
      const url = `http://localhost:5000`;
      const response = await fetch(url + '/api/menu');
  
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
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) {
      setProducts(allProducts);
      return;
    }

    try {
      const url = `http://localhost:5000`;
      const response = await fetch(url + `/api/menu?search=${searchQuery.toLowerCase()}`);

      if (!response.ok) {
        throw new Error(`Error fetching search prodcut`);
      }
      const data = await response.json();
      const updatedProducts = data.payload.datas.map((product) => ({
        ...product,
        harga: product.harga ? parseFloat(product.harga) : 0,
      }))
      setProducts(updatedProducts);
    } catch (err) {
      console.error("Error during search", err);
    }
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setIsLoading(true);

    if (category === "Semua") {
      setProducts(allProducts);
      setIsLoading(false);
      return;
    }
    const url = `http://localhost:5000`;
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

  const handleAddToCart = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin ingin memesan produk ini?",
      text: "Pastikan Anda sudah memilih produk yang tepat sebelum melanjutkan. Anda akan memesan produk ini.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yakin"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Produk Berhasil Ditambahkan!",
          text: "Produk yang Anda pilih telah berhasil ditambahkan ke keranjang belanja Anda. Silakan lanjutkan belanja atau lihat keranjang Anda.",
          icon: "success",
          confirmButtonColor: "#10B981",
          confirmButtonText: "OK"
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
      }
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
  
  const images = [
    "",
  ];

  return (
    <div className="bg-background">
      <Navbar />

      <Banner images={images}></Banner>

      <div className="flex justify-center mt-5 w-full px-10">
        <div className="form-control px-2 sm:w-[50%] w-full block">
          <input
            type="text"
            placeholder="Cari produk..."
            className="px-4 py-2 rounded-md input-bordered w-full shadow sm:h-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
        <Button classname="bg-primary hover:bg-emerald-700 sm:px-4 sm:h-10 w-20 text-sm sm:text-md" onClick={handleSearch}>Cari</Button>
      </div>

      <div className="flex justify-center mt-5">
        <div className="flex gap-4">
          {categories.map((category, index) => (
            <Button
              key={index}
              classname={`${
                selectedCategory === category ? "bg-emerald-500" : "bg-gray-500"
              } text-white p-2 rounded-md`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {isLoading ? (
      <div className="flex justify-center mt-5">
        <div className="flex py-5 justify-center flex-wrap md:w-4/5 w-full rounded-md">
          {Array.from({ length: products.length > 0 ? products.length : 4 }).map((_, index) => (
            <div key={index} className="flex w-52 flex-col gap-4">
              <div className="skeleton h-32 w-full"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
          ))}
        </div>
      </div>
      ):(
      <div className="flex justify-center mt-5">
        <div className="flex py-5 justify-center flex-wrap md:w-4/5 w-full rounded-md mb-6">
          {products.length > 0 &&
            products.map((product) => {
              return (
                <CardProduct key={product.id} onClick={() => handleProductClick(product)}>
                  <CardProduct.Header path_gambar={product.path_gambar} />
                  <CardProduct.Body nama={product.nama} harga={product.harga} />
                  <CardProduct.Footer
                    onClick={() => {
                      handleProductClick(product);
                    }}
                  />
                </CardProduct>
              );
            })}
        </div>
      </div>
      )}

      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-md w-3/4 md:w-1/3">
            <h2 className="text-2xl font-bold">{selectedProduct.nama}</h2>
            <img
              src={selectedProduct.path_gambar}
              alt={selectedProduct.nama}
              className="my-3"
            />
            <p>{selectedProduct.deskripsi}</p>
            <p className="font-semibold">
              Harga: {selectedProduct.harga.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </p>
            <div className="flex gap-4 items-center mt-4">
              <Button onClick={handleCloseModal} classname="bg-red-500 w-1/2">
                Close
              </Button>
              <Button
                classname="w-1/2 bg-primary hover:bg-emerald-700"
                onClick={() => handleAddToCart(selectedProduct.id)}
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
