import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productdata } from "../data/ProductData";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

const HProductPage = () => {
  const { id } = useParams();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const product = productdata.find((product) => product.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleClick = () => {
    if (isAuthenticated) {
      console.log("good");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="container flex flex-col  p-4">
      <div
        className="flex w-32 pl-16 cursor-pointer hover:scale-[1.1] transition-[scale_1s_ease_in_out] "
        onClick={() => {
          navigate("/");
        }}
      >
        <svg
          className="w-8 h-8 text-indigo-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#4f46e5"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h14M5 12l4-4m-4 4 4 4"
          />
        </svg>
      </div>
      <div className="flex p-4 ">
        <div className="flex justify-center items-start w-full p-10">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>
        <div className="flex  flex-col w-full p-2 mt-3">
          <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
          <div className="flex items-center mt-2 mb-4">
            <span className="text-yellow-500">
              {"★".repeat(Math.floor(product.rating))}
            </span>
            <span className="text-gray-400 ">
              {"★".repeat(5 - Math.floor(product.rating))}
            </span>
            <span className="ml-2 text-sm text-gray-600 ">
              ({product.rating})
            </span>
          </div>
          <p className="ml-2 text-gray-400 mb-2 ">{product.description}</p>
          <p className="text-xl font-semibold">
            MRP. <span className="text-red-300/90">{product.price}</span>
          </p>
          <button
            onClick={handleClick}
            className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default HProductPage;
