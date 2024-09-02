// Carousel.js
import React, { useState, useEffect } from "react";

const images = [
  {
    src: "https://images-static.nykaa.com/uploads/27fc5899-b693-4288-971b-5dd3386c3570.gif",
    text: "Image 1",
  },
  {
    src: "https://media6.ppl-media.com/tr:w-1280,c-at_max,pr-true,dpr-2/mediafiles/ecomm/misc/1719996240_lakme_makeup_primer_2596x836.jpeg",
    text: "Image 2",
  },
  {
    src: "https://media6.ppl-media.com/tr:w-1280,c-at_max,pr-true,dpr-2/mediafiles/ecomm/misc/1720516456_blue_heaven_eyeshadow_stick_2596x836.jpeg",
    text: "Image 3",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full sm:h-[55vh] overflow-hidden z-10">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="min-w-full relative ">
            <img
              src={image.src}
              alt={image.text}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6  text-xl text-black font-extrabold drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-gray-400 w-full p-4 text-left">
              {/* {image.text} */}
            </div>
          </div>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-50 text-white hover:text-primary text-2xl p-2 focus:outline-none hover:scale-[1.1] transition-[scale_4s_ease_in_out]"
        onClick={prevSlide}
      >
        &#10094;
      </button>
      <button
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-50 text-white hover:text-primary text-2xl p-2 focus:outline-none hover:scale-[1.1] transition-[scale_4s_ease_in_out]"
        onClick={nextSlide}
      >
        &#10095;
      </button>
      <div className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-gray-900" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
