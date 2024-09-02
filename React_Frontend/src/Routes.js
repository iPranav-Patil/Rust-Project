import Home from "./pages/Home";
import HProductPage from "./components/HProductPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Appliances from "./pages/Appliances";
import Women from "./pages/Women";
import Men from "./pages/Men";
import Cart from "./pages/Cart";

export const Path = [
  {
    path: "/",
    component: Home,
    protected: false,
  },
  {
    path: "/login",
    component: Login,
    protected: false,
  },
  {
    path: "/signup",
    component: Signup,
    protected: false,
  },
  {
    path: "/product/:id",
    component: HProductPage,
    protected: true,
  },
  {
    path: "/appliances",
    component: Appliances,
    protected: true,
  },
  {
    path: "/men",
    component: Men,
    protected: true,
  },
  {
    path: "/women",
    component: Women,
    protected: true,
  },
  {
    path: "/cart",
    component: Cart,
    protected: true,
  },
];
