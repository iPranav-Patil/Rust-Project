import React, { useState } from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Toast from "./Toast";

const Products = ({ product, title }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState(false);

  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  const handleBuy = (item) => {
    if (isAuthenticated) {
      console.log("damn logged in");
      // logic here
    } else {
      console.log("login kid");
      navigate("/login");
    }
  };

  const handleCookie = () => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    };

    const parseJSON = (jsonString) => {
      try {
        return JSON.parse(jsonString);
      } catch (e) {
        console.error("Error parsing JSON:", e);
        return null;
      }
    };

    const authStateCookie = getCookie("_auth_state");
    if (authStateCookie) {
      const authState = parseJSON(decodeURIComponent(authStateCookie));
      return authState?.email || null;
    }
    return null;
  };

  const handleCart = async (item) => {
    const email = handleCookie();
    if (!email) {
      console.error("User is not authenticated.");
      navigate("/login");
      return;
    }

    const itemWithEmailAndCategory = {
      ...item,
      quantity: 1,
      category: title.toLowerCase(),
      email,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/addtocart",
        itemWithEmailAndCategory
      );
      console.log("Success:", response.data);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = product.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {toast && <Toast message={"Item Added to Cart"} type={true} />}
      <div className="flex flex-col justify-center items-center w-full h-full p-10 gap-6">
        <div className="flex justify-center items-center w-full gap-10">
          <label className="text-xl font-medium">Search</label>
          <div className="relative w-2/6">
            <input
              type="text"
              className="relative rounded-3xl border-[0.1px] border-gray-400 bg-indigo-600 pl-5 pr-10 py-2 w-full focus:outline-none"
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="absolute top-0 right-1 h-full flex items-center pr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 50 50"
                className="w-5 h-5 fill-current text-white"
              >
                <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-start">
          <h1 className="text-4xl px-4 text-indigo-600 font-medium bg-gray-900/10 rounded-xl py-2">
            {title === "Appliances" ? title : `${title}'s Fashion`}
          </h1>
        </div>
        <div className="flex flex-wrap p-10 gap-10">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="sm:w-[20rem] w-[15rem] h-full border-[0.1px] border-gray-600/30 shadow-[2px_2px_20px_0px_#4e46e56e] rounded-lg"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4 bg-[#1a1a1a] rounded-b-xl">
                <h3 className="lg:text-lg font-bold">{item.name}</h3>
                <div className="flex items-center mt-2 mb-4">
                  <span className="text-yellow-500">
                    {"★".repeat(Math.floor(item.rating))}
                  </span>
                  <span className="text-gray-400">
                    {"★".repeat(5 - Math.floor(item.rating))}
                  </span>
                  <span className="ml-2 text-sm text-gray-600">
                    ({item.rating})
                  </span>
                </div>
                <p className="text-xl font-semibold">{item.price}</p>
                <div className="flex justify-around">
                  <div
                    onClick={() => handleBuy(item)}
                    className="cursor-pointer text-white hover:text-white mt-4 py-2 px-3 lg:py-3 lg:px-8 hover:bg-indigo-600 font-semibold text-secondary rounded-3xl border-2 border-indigo-600 hover:shadow-[0px_0px_20px_0px] hover:shadow-indigo-600 hover:scale-[1.02] transition-[scale_1s_ease_in_out]"
                  >
                    Buy
                  </div>
                  <div
                    onClick={() => handleCart(item)}
                    className="cursor-pointer text-white hover:text-white mt-4 py-2 px-3 lg:py-3 lg:px-8  hover:bg-indigo-600 font-semibold text-secondary rounded-3xl border-2 border-indigo-600 hover:shadow-[0px_0px_20px_0px] hover:shadow-indigo-600 hover:scale-[1.02] transition-[scale_1s_ease_in_out]"
                  >
                    Add to Cart
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
