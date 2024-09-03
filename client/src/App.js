import React from "react";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Food from "./components/Food";
import Snack from "./components/Snack";
import MainCourse from "./components/MainCourse";
import Drinks from "./components/Drinks";
import Services from "./components/Services";
import Info from "./components/Info";
import Checkout from "./components/Checkout";
import AdminLogin from "./admin/AdminLogin";
import AdminHome from "./admin/AdminHome";
import { CartProvider } from "./components/CartContext";

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="h-full w-full bg-slate-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/food" element={<Food />} />
            <Route path="/snack" element={<Snack />} />
            <Route path="/courses" element={<MainCourse />} />
            <Route path="/drinks" element={<Drinks />} />
            <Route path="/services" element={<Services />} />
            <Route path="/info" element={<Info />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/adminLogin" element={<AdminLogin />} />
            <Route path="/adminHome" element={<AdminHome />} />
          </Routes>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
