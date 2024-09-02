import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "react-auth-kit/AuthProvider";
import RequireAuth from "@auth-kit/react-router/RequireAuth";

import "./App.css";

import { store } from "./store";

import Navbar from "./components/Navbar";
import { Path } from "./Routes";

function App() {
  return (
    <div className="w-[98.9vw] h-screen">
      <AuthProvider store={store}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            {Path.map(
              ({ path, component: Component, protected: isProtected }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    isProtected ? (
                      <RequireAuth fallbackPath="/login">
                        <Component />
                      </RequireAuth>
                    ) : (
                      <Component />
                    )
                  }
                />
              )
            )}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
