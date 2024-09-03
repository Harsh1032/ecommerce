import React from "react";
import CartLogo from "../assets/cart.png";
import PizzaLogo from "../assets/pizza.jpg";
import MansafLogo from "../assets/mansaf.jpg";
import BurgerLogo from "../assets/burger.jpg";
import KnafehLogo from "../assets/knafeh.jpg";
import { Link } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";

const MainCourse = () => {
  return (
    <div className="h-[100%] w-full py-6 flex flex-col  overflow-y-scroll no-scrollbar">
      <h1 className="mx-auto text-5xl font-bold my-5">Al Reem Mart</h1>
      <div className="mx-auto flex justify-center items-center ">
        <h2 className="text-2xl font-bold ">Main Courses</h2>
      </div>
      <div className="flex xs:flex-col md:flex-row xs:h-auto py-5 my-2 w-full  xs:overflow-y-scroll xs:no-scrollbar md:overflow-y-hidden">
        <div className="flex flex-col items-center xs:w-[90%] md:w-[300px] h-auto mx-auto my-2">
          <div className="flex flex-col items-center py-2 w-full h-[330px] bg-white border rounded-lg shadow-lg">
            <h3 className="text-3xl font-bold my-2 ">Pizza</h3>
            <img
              src={PizzaLogo}
              className="w-[90%] h-[65%] rounded-lg"
              alt="food"
            />
            <h3 className="text-3xl font-bold my-2 ">$5</h3>
          </div>{" "}
          <button className="flex items-center mt-4 p-2 bg-blue-500 rounded-lg shadow-lg hover:bg-opacity-80 ">
            <IoIosAdd color={"white"} size={30} />
            <span className="text-3xl font-medium text-white">Add to cart</span>
          </button>
        </div>
        <div className="flex flex-col items-center xs:w-[90%] md:w-[300px] h-auto mx-auto my-2">
          <div className="flex flex-col items-center py-2 w-full h-[330px] bg-white border rounded-lg shadow-lg">
            <h3 className="text-3xl font-bold my-2 ">Burger</h3>
            <img
              src={BurgerLogo}
              className="w-[90%] h-[65%] rounded-lg"
              alt="house keeping"
            />
            <h3 className="text-3xl font-bold my-2 ">$6</h3>
          </div>{" "}
          <button className="flex items-center mt-4 p-2 bg-blue-500 rounded-lg shadow-lg hover:bg-opacity-80 ">
            <IoIosAdd color={"white"} size={30} />
            <span className="text-3xl font-medium text-white">Add to cart</span>
          </button>
        </div>
        <div className="flex flex-col items-center xs:w-[90%] md:w-[300px] h-auto mx-auto my-2">
          <div className="flex flex-col items-center py-2 w-full h-[330px] bg-white border rounded-lg shadow-lg">
            <h3 className="text-3xl font-bold my-2 ">Mansaf</h3>
            <img
              src={MansafLogo}
              className="w-[90%] h-[65%] rounded-lg"
              alt="need help"
            />
            <h3 className="text-3xl font-bold my-2 ">$9</h3>
          </div>{" "}
          <button className="flex items-center mt-4 p-2 bg-blue-500 rounded-lg shadow-lg hover:bg-opacity-80 ">
            <IoIosAdd color={"white"} size={30} />
            <span className="text-3xl font-medium text-white">Add to cart</span>
          </button>
        </div>
        <div className="flex flex-col items-center xs:w-[90%] md:w-[300px] h-auto mx-auto my-2">
          <div className="flex flex-col items-center py-2 w-full h-[330px] bg-white border rounded-lg shadow-lg">
            <h3 className="text-3xl font-bold my-2 ">Knafeh</h3>
            <img
              src={KnafehLogo}
              className="w-[90%] h-[65%] rounded-lg"
              alt="need help"
            />
            <h3 className="text-3xl font-bold my-2 ">$4</h3>
          </div>{" "}
          <button className="flex items-center mt-4 p-2 bg-blue-500 rounded-lg shadow-lg hover:bg-opacity-80 ">
            <IoIosAdd color={"white"} size={30} />
            <span className="text-3xl font-medium text-white">Add to cart</span>
          </button>
        </div>
      </div>
      <div className="h-[80px] w-full flex ">
        <Link
          to="/checkout"
          className="my-3 xs:w-[60%] h-[60px] md:w-[250px] flex bg-white border rounded-lg shadow-lg mx-auto justify-center px-2 items-center"
        >
          <img src={CartLogo} alt="cart" className="w-[40px] h-[40px]" />
          <span className="text-3xl font-bold ">Checkout</span>
        </Link>
        <Link
          to="/food"
          className="my-3 xs:w-[30%] h-[60px] md:w-[150px] flex bg-white border rounded-lg shadow-lg mx-auto justify-center px-2 items-center"
        >
          <span className="text-3xl font-bold ">Back</span>
        </Link>
      </div>
    </div>
  );
};

export default MainCourse;
