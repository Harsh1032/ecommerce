import React from "react";
import FoodLogo from "../assets/snacks.jpg";
import ServiceLogo from "../assets/housekeeping.jpg";
import InfoLogo from "../assets/help.jpg";
import CartLogo from "../assets/cart.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-[100%] w-full py-8 flex flex-col  overflow-y-scroll no-scrollbar">
      <h1 className="mx-auto text-5xl font-bold my-5">Al Reem Mart</h1>
      <div className="flex xs:flex-col md:flex-row xs:h-[1000px] md:h-auto py-5 my-5 w-full  xs:overflow-y-scroll xs:no-scrollbar md:overflow-y-hidden">
        <Link
          to="/food"
          className="flex flex-col items-center py-2 xs:w-[90%] md:w-[300px] h-[300px] bg-white border rounded-lg shadow-lg mx-auto my-2"
        >
          <img
            src={FoodLogo}
            className="w-[90%] h-[80%] rounded-lg"
            alt="food"
          />
          <h3 className="text-3xl font-bold my-2 ">Food</h3>
        </Link>
        <Link
          to="/services"
          className="flex flex-col items-center py-2 xs:w-[90%] md:w-[300px] h-[300px] bg-white border rounded-lg shadow-lg mx-auto my-2"
        >
          <img
            src={ServiceLogo}
            className="w-[90%] h-[80%] rounded-lg"
            alt="house keeping"
          />
          <h3 className="text-3xl font-bold my-2 ">Services</h3>
        </Link>
        <Link
          to="/info"
          className="flex flex-col items-center py-2 xs:w-[90%] md:w-[300px] h-[300px] bg-white border rounded-lg shadow-lg mx-auto my-2"
        >
          <img
            src={InfoLogo}
            className="w-[90%] h-[80%] rounded-lg"
            alt="need help"
          />
          <h3 className="text-3xl font-bold my-2 ">Info</h3>
        </Link>
      </div>
      <div className="h-[80px] w-full my-3">
        <Link
          to="/checkout"
          className="my-3 xs:w-[60%] h-[60px] md:w-[250px] flex bg-white border rounded-lg shadow-lg mx-auto justify-center px-2 items-center"
        >
          <img src={CartLogo} alt="cart" className="w-[40px] h-[40px]" />
          <span className="text-3xl font-bold ">Checkout</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;
