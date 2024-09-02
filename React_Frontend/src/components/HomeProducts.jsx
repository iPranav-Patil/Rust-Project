import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { productdata } from "../data/ProductData";

const HomeProducts = () => {
  const containerRef = useRef(null);

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = 600; // Adjust scroll amount as needed
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 mb-64 mt-16 h-[35rem]">
      <div className="flex justify-between p-4">
        <h1 className="text-indigo-600 font-medium">Appliances</h1>
        <div className="flex gap-4 justify-center items-center p-4">
          <button
            onClick={() => scroll("left")}
            className="px-4 py-1 bg-black/30 bg-opacity-50 text-white hover:text-indigo-700 text-3xl p-2 focus:outline-none "
          >
            &#10094;
          </button>
          <button
            onClick={() => scroll("right")}
            className="px-4 py-1 bg-black/30 bg-opacity-50 text-white hover:text-indigo-700 text-3xl p-2 focus:outline-none "
          >
            &#10095;
          </button>
        </div>
      </div>
      <div
        ref={containerRef}
        className="flex gap-16 p-4 justify-start items-center w-full overflow-x-auto text-black h-full"
        style={{
          overflow: "auto",
          scrollbarWidth: "none" /* Firefox */,
          msOverflowStyle: "none" /* Internet Explorer and Edge */,
        }}
      >
        {productdata.map((product) => (
          <div
            key={product.id}
            className="text-white inline-block min-w-[40%] lg:min-w-[20%] w-[20%] h-[25rem] border-[0.1px] border-gray-600/30  shadow-[5px_5px_20px_0px_#4e46e56e] rounded-lg "
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="  text-sm text-wrap lg:text-lg font-bold">{product.name}</h3>
              <div className="flex items-center mt-2 mb-4">
                <span className="text-yellow-500">
                  {"★".repeat(Math.floor(product.rating))}
                </span>
                <span className="text-gray-400 ">
                  {"★".repeat(5 - Math.floor(product.rating))}
                </span>
                <span className="ml-2 text-sm text-gray-600">
                  ({product.rating})
                </span>
              </div>
              <p className="text-wrap lg:text-xl font-semibold">{product.price}</p>
              <Link
                to={`/product/${product.id}`}
                className="mt-4 inline-block  hover:text-white py-2 px-8 rounded-lg hover:bg-indigo-600 font-semibold text-secondary  border-2 border-indigo-600 hover:shadow-[0px_0px_20px_0px] hover:shadow-indigo-600 hover:scale-[1.02] transition-[scale_1s_ease_in_out]"
              >
                Buy
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeProducts;
