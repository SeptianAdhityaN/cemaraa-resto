import React, { useState, useEffect } from "react";

const Banner = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Geser otomatis setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval); // Membersihkan interval
  }, [currentIndex]);

  // Fungsi untuk menggeser ke slide berikutnya
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Fungsi untuk menggeser ke slide sebelumnya
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative h-64 overflow-hidden bg-primary mt-16">
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className="w-full h-64 object-cover"
          />
        ))}
      </div>

      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700"
        onClick={prevSlide}
      >
        <ion-icon name="chevron-back-outline"></ion-icon>
      </button>

      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-700"
        onClick={nextSlide}
      >
        <ion-icon name="chevron-forward-outline"></ion-icon>
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-500"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Banner;
