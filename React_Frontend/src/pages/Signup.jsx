import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Toast from "../components/Toast";

import logo from "../assets/logo.svg";
import { API_URL } from "../context/Config";

const Signup = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState(false);
  const [toasttype, setToastType] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/user`, formData);

      if (response.status === 201) {
        setToast(true);
        setToastType(true);
        setTimeout(() => {
          setToast(false);
          navigate("/login");
        }, 2000);
      } else if (response.status === 200) {
        setToast(true);
        setToastType(false);
        // alert("Signup failed! User already exists");
        setTimeout(() => {
          setToast(false);
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <>
      {toast && toasttype && (
        <>
          <Toast message={"Successfully Registered"} type={true} />
        </>
      )}
      {toast && !toasttype && (
        <>
          <Toast message={"User Already Exists! Please Login"} type={false} />
        </>
      )}
      <main className="relative w-full flex dark:bg-[#202020] dark:text-white h-full">
        <div className="relative flex-1 hidden items-start lg:pt-32 justify-center bg-gray-900 lg:flex">
          <div className="relative z-10 w-full max-w-md">
            <img src={logo} width={200} />
            <div className="mt-6 space-y-3">
              <h3 className="text-white text-3xl font-bold">
                The best E-commerce of all time
              </h3>
              <p className="text-gray-300">
                This platform is really good, try it once!
              </p>
              <div className="flex items-center -space-x-2 overflow-hidden">
                <img
                  src="https://randomuser.me/api/portraits/women/79.jpg"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img
                  src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img
                  src="https://randomuser.me/api/portraits/men/86.jpg"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img
                  src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <p className="text-sm text-gray-400 font-medium translate-x-5">
                  Join 5,000+ users
                </p>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-0 my-auto h-[500px]"
            style={{
              background:
                "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
              filter: "blur(118px)",
            }}
          ></div>
        </div>
        <div className="flex-1 flex items-start justify-center lg:pt-32">
          <div className="w-full max-w-md space-y-8 px-4 dark:bg-[#202020] dark:text-white sm:px-0">
            <div>
              <img src={logo} width={150} className="lg:hidden" />
              <div className="mt-5 space-y-2">
                <h3 className="text-gray-300 text-2xl font-bold sm:text-3xl">
                  Sign Up
                </h3>
                <div className="flex gap-2">
                  Already have an account?{" "}
                  <div
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="font-medium text-indigo-600 hover:text-indigo-500 bg-none cursor-pointer"
                  >
                    Login
                  </div>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-100 bg-transparent outline-none border focus:border-indigo-500 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-100 bg-transparent outline-none border focus:border-indigo-500 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-100 bg-transparent outline-none border focus:border-indigo-500 shadow-sm rounded-lg"
                />
              </div>
              <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                Create Account
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Signup;
