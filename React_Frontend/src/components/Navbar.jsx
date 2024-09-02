import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import navigation from "../data/Navigation";
import logo from "../assets/logo.svg";

const Navbar = () => {
  const [state, setState] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const SignOut = useSignOut();

  const handleClick = () => {
    if (isAuthenticated) {
      if (confirm("Do you want to Logout?")) {
        SignOut();
        window.location.replace("/");
      }
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="dark:bg-[#3b3939] bg-[#3a3737] dark:text-white border-b w-full md:static md:text-sm md:border-none">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-2 md:py-5 md:block">
          <div
            className="flex items-center text-xl font-bold cursor-pointer"
            onClick={handleClick}
          >
            <img src={logo} className="h-12" alt="Camazon logo" />
            Camazon
          </div>
          <div className="md:hidden">
            <button
              className="focus:outline-none hover:text-indigo-700"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`sm:flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          } md:flex md:items-center md:justify-end`}
        >
          <ul className="space-y-3 sm:space-y-6 md:flex md:space-x-6 md:space-y-0">
            {navigation.map((item, idx) => (
              <li key={idx} className="hover:text-indigo-600">
                <button
                  onClick={() => navigate(item.route)}
                  className="focus:outline-none"
                >
                  {item.title}
                </button>
              </li>
            ))}
            <div className="space-y-3 items-center gap-x-6 md:flex md:space-y-0">
              {isAuthenticated ? (
                <li>
                  <div
                    className="w-4/6 sm:w-full cursor-pointer block py-1 sm:py-3 sm:px-4 font-medium text-center text-white bg-indigo-600 hover:text-black hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow"
                    onClick={() => navigate("/cart")}
                  >
                    Cart
                  </div>
                </li>
              ) : (
                <li>
                  <div
                    onClick={() => navigate("/login")}
                    className="cursor-pointer block py-1 px-2 sm:py-3 sm:px-4 font-medium text-center text-white bg-indigo-600 hover:text-black hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow"
                  >
                    Login
                  </div>
                </li>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
