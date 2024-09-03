import React from "react";
import SnackLogo from "../assets/snacks.jpg";
import MainCourseLogo from "../assets/main.jpg";
import DrinkLogo from "../assets/drinks.jpg";
import CartLogo from "../assets/cart.png";
import { Link } from "react-router-dom";

const Food = () => {
  return (
    <div className="h-[100%] w-full py-8 flex flex-col  overflow-y-scroll no-scrollbar">
      <h1 className="mx-auto text-5xl font-bold my-5">Al Reem Mart</h1>
      <div className="flex xs:flex-col md:flex-row xs:h-auto py-5 my-5 w-full  xs:overflow-y-scroll xs:no-scrollbar md:overflow-y-hidden">
        <Link
          to="/snack"
          className="flex flex-col items-center py-2 xs:w-[90%] md:w-[300px] h-[300px] bg-white border rounded-lg shadow-lg mx-auto my-2"
        >
          <img
            src={SnackLogo}
            className="w-[90%] h-[80%] rounded-lg"
            alt="food"
          />
          <h3 className="text-3xl font-bold my-2 ">Snacks</h3>
        </Link>
        <Link
          to="/courses"
          className="flex flex-col items-center py-2 xs:w-[90%] md:w-[300px] h-[300px] bg-white border rounded-lg shadow-lg mx-auto my-2"
        >
          <img
            src={MainCourseLogo}
            className="w-[90%] h-[80%] rounded-lg"
            alt="house keeping"
          />
          <h3 className="text-3xl font-bold my-2 ">Main Courses</h3>
        </Link>
        <Link
          to="/drinks"
          className="flex flex-col items-center py-2 xs:w-[90%] md:w-[300px] h-[300px] bg-white border rounded-lg shadow-lg mx-auto my-2"
        >
          <img
            src={DrinkLogo}
            className="w-[90%] h-[80%] rounded-lg"
            alt="need help"
          />
          <h3 className="text-3xl font-bold my-2 ">Drinks</h3>
        </Link>
      </div>
      <div className="h-[80px] w-full flex my-3">
        <Link
          to="/checkout"
          className="my-3 xs:w-[60%] h-[60px] md:w-[250px] flex bg-white border rounded-lg shadow-lg mx-auto justify-center px-2 items-center"
        >
          <img src={CartLogo} alt="cart" className="w-[40px] h-[40px]" />
          <span className="text-3xl font-bold ">Checkout</span>
        </Link>
        <Link
          to="/"
          className="my-3 xs:w-[30%] h-[60px] md:w-[150px] flex bg-white border rounded-lg shadow-lg mx-auto justify-center px-2 items-center"
        >
          <span className="text-3xl font-bold ">Back</span>
        </Link>
      </div>
    </div>
  );
};

export default Food;
