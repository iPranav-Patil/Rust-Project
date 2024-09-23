import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../context/Config";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const email_value = handleCookie();
        const response = await axios.post(`${API_URL}/cart`, {
          email: email_value,
        });

        // console.log("Success:", response.data);
        setProducts(response.data.cart);
        const newQuantities = {};
        response.data.cart.forEach((item) => {
          const key = `${item.id}-${item.category}`;
          newQuantities[key] = item.quantity;
        });
        setQuantities(newQuantities);
        setAddress(response.data.address);
        setNumber(response.data.number);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchCartData();
  }, []);

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

  const incrementQuantity = async (id, category) => {
    const key = `${id}-${category}`;
    const newQuantities = { ...quantities, [key]: quantities[key] + 1 };
    setQuantities(newQuantities);
    await updateQuantityOnBackend(id, category, newQuantities[key]);
  };

  const decrementQuantity = async (id, category) => {
    const key = `${id}-${category}`;
    if (quantities[key] > 1) {
      const newQuantities = { ...quantities, [key]: quantities[key] - 1 };
      setQuantities(newQuantities);
      await updateQuantityOnBackend(id, category, newQuantities[key]);
    } else {
      await removeItem(id, category);
    }
  };

  const updateQuantityOnBackend = async (id, category, quantity) => {
    const email_value = handleCookie();
    if (!email_value) {
      console.error("User is not authenticated.");
      return;
    }

    const data = {
      email: email_value,
      item_name: products.find(
        (item) => item.id === id && item.category === category
      ).name,
      quantity: quantity,
    };

    try {
      const response = await axios.put(
        `${API_URL}/cart/quantity`,
        data
      );
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const removeItem = async (id, category) => {
    const key = `${id}-${category}`;
    await removeItemFromBackend(id, category);
    const newProducts = products.filter(
      (item) => `${item.id}-${item.category}` !== `${id}-${category}`
    );

    const newQuantities = { ...quantities };
    delete newQuantities[key];
    setProducts(newProducts);
    setQuantities(newQuantities);
  };

  const removeItemFromBackend = async (id, category) => {
    const email_value = handleCookie();
    if (!email_value) {
      console.error("User is not authenticated.");
      return;
    }

    const data = {
      email: email_value,
      item_name: products.find(
        (item) => item.id === id && item.category === category
      ).name,
    };

    try {
      const response = await axios.delete(`${API_URL}/cart/item`, {
        data,
      });
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const total = products.reduce(
    (acc, item) =>
      acc +
      parseInt(item.price.slice(1), 10) *
        quantities[`${item.id}-${item.category}`],
    0
  );

  const totalItems = Object.values(quantities).reduce(
    (acc, quantity) => acc + quantity,
    0
  );

  const setUserInfo = async (e) => {
    e.preventDefault();
    try {
      const email_value = handleCookie();
      const response = await axios.post(`${API_URL}/user_data`, {
        email: email_value,
        address: address,
        number: parseInt(number),
      });
      console.log("Success:", response.data);
      setAddress(response.data.address);
      setNumber(response.data.number);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col translate-y-[47rem]  md:translate-y-0 md:flex-row md:items-start justify-center gap-4 p-4 w-full h-full">
      <div className="p-2 w-full md:w-2/3 bg-[#353535] rounded-md ">
        <p className="font-bold tracking-wider pb-4 text-3xl p-2">
          Shopping Cart
        </p>

        <div>
          <CartCard Products={products} Quantities={quantities} />
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full md:w-1/3 h-auto">
        <form
          onSubmit={setUserInfo}
          className="bg-[#353535] rounded-md h-auto p-4 flex flex-col items-center gap-4 w-full"
        >
          <div className="flex flex-col gap-4 w-full">
            <div className="flex">
              <input
                type="text"
                value={number}
                className="w-full h-10 rounded-md p-2 bg-[#6e6e6e52] outline-none border-primary border placeholder-indigo-300 text-indigo-200 focus:border-[3px]"
                placeholder="Enter 10 digit Contact Number"
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,10}$/.test(value)) {
                    setNumber(value);
                  }
                }}
                pattern="\d{10}"
                title="Please enter a valid 10-digit phone number"
              />
            </div>
            <div className="flex">
              <input
                type="text"
                value={address}
                className="w-full h-10 rounded-md p-2 bg-[#6e6e6e52] outline-none border-primary border placeholder-indigo-300  text-indigo-200 focus:border-[3px]"
                placeholder="Enter Address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className=" flex justify-start items-center w-full">
            <button type="submit" className="p-3 px-10">
              Save
            </button>
          </div>
        </form>
        <div className="flex flex-col gap-4 p-2 w-full bg-[#353535] rounded-md h-[60vh] pt-4">
          <div className="overflow-y-scroll scrollbar">
            {products.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className={`flex flex-col p-4 gap-4 mr-2 ${
                  index === products.length - 1 ? "" : "border-b"
                } border-gray-400`}
              >
                <div className="flex flex-col gap-4">
                  <div className="text-2xl">
                    {item.name}
                    <span className="text-xs font-light ml-2">
                      (
                      {item.category === "appliances"
                        ? item.category.toUpperCase()
                        : `${item.category.toUpperCase()}'s fashion`}
                      )
                    </span>
                  </div>
                  <div className="flex justify-around w-full items-center">
                    <img
                      src={item.img}
                      className="w-32 h-32 border border-white"
                      alt=""
                    />
                    <div className="text-2xl">
                      <p>{item.price}</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 px-4 items-center w-full">
                  <div className="grid grid-cols-4 border-2 border-indigo-600 rounded-lg">
                    <div
                      onClick={() => decrementQuantity(item.id, item.category)}
                      className="col-span-1 text-center bg-primary hover:bg-indigo-600 cursor-pointer rounded-l-lg border-r border-indigo-600"
                    >
                      -
                    </div>
                    <div className="col-span-2 text-center">
                      <p>{quantities[`${item.id}-${item.category}`]}</p>
                    </div>
                    <div
                      onClick={() => incrementQuantity(item.id, item.category)}
                      className="col-span-1 text-center bg-primary hover:bg-indigo-600 cursor-pointer rounded-r-lg border-l border-indigo-600"
                    >
                      +
                    </div>
                  </div>
                  <div className="flex w-full justify-center ">
                    <button
                      className="focus:outline-none py-1 md:py-2"
                      onClick={() => removeItem(item.id, item.category)}
                    >
                      Remove Item
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex w-full justify-around text-xl font-medium border border-gray-300/50 p-3 rounded-lg">
            <label htmlFor="Total">Total ({totalItems} Items):</label>
            <p>₹{total}</p>
          </div>
          <div className="w-full flex justify-center">
            <button className=" w-full focus:outline-none hover:text-indigo-200">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

const CartCard = ({ Products, Quantities }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = Products.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div>
        <div className="flex flex-col justify-center items-center w-full h-full p-4 gap-6">
          <div className="flex justify-center items-center w-full gap-4">
            <div className="relative w-full md:w-5/6">
              <input
                type="text"
                className="relative rounded-3xl border-2 shadow-lg border-primary bg-indigo-600 pl-5 pr-10 py-2 w-full focus:outline-none"
                value={searchTerm}
                onChange={handleSearch}
              />
              <div className="absolute top-0  right-1 h-full flex items-center pr-2">
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

          <div className="flex flex-wrap justify-center gap-6">
            {filteredProducts.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="sm:w-[20rem] w-full h-full border-[0.1px] border-gray-600/30 shadow-[2px_2px_20px_0px_#4e46e56e] rounded-lg mx-2"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-t-lg border border-white"
                />
                <div className="p-4 bg-[#1a1a1a] rounded-b-xl">
                  <h3 className="lg:text-lg font-bold">{item.name}</h3>
                  <div className="flex items-center justify-between mt-2 mb-4">
                    <div className="flex items-center ">
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

                    <div className=" italic font-extralight">
                      Quantity: {Quantities[`${item.id}-${item.category}`]}
                    </div>
                  </div>
                  <div className="flex w-full justify-between ">
                    <p className="text-xl font-semibold">{item.price}</p>
                    <p className=" font-medium text-sm">
                      {/* <span>Type - </span> */}
                      {item.category === "appliances"
                        ? item.category.toUpperCase()
                        : `${item.category.toUpperCase()}'s fashion`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
