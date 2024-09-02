import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Carousel from "../components/Carousel";
import HomeProducts from "../components/HomeProducts";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  // const handleFetch = async () => {
  //   axios
  //     .get("http://localhost:8000/test")
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  //   axios
  //     .post("http://localhost:8000/user_data", {
  //       email: "company@gmail.com",
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };
  return (
    <div className=" overflow-hidden flex flex-col gap-4 justify-center min-h-full relative z-10">
      <Carousel />
      {/* <button onClick={handleFetch}>Java</button> */}

      {!isAuthenticated && (
        <div className="w-full flex justify-center mt-6 h-14">
          <button
            onClick={() => {
              navigate("/signup");
            }}
            className="font-bold tracking-wider px-20 py-4 text-white shadow-[2px_2px_20px_0px] border border-white/10  hover:border-white/20 shadow-indigo-700 bg-indigo-700 hover:scale-[1.03] transition-[scale_4000ms_ease_in_out] hover:bg-indigo-600"
          >
            Get Started
          </button>
        </div>
      )}
      <HomeProducts />
    </div>
  );
};

export default Home;
