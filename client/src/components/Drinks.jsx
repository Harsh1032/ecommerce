import React,{ useState, useEffect } from "react";
import CartLogo from "../assets/cart.png";
import TeaLogo from "../assets/tea.jpeg";
import CoffeeLogo from "../assets/coffee.jpg";
import WaterLogo from "../assets/water.jpeg";
import { Link } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { useCart } from "./CartContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Drinks = () => {

  const { addToCart, cart } = useCart();
  const [menuItems, setMenuItems] = useState([]);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/drink/getDrinks`);
      setMenuItems(response.data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const handleAddToCart = (menuItem) => {
    try {
      addToCart(menuItem);
      toast.success("Item added to cart successfully!");
    } catch (error) {
      toast.error("Failed to add item to cart.");
    }
  };

  return (
    <div className="h-[100%] w-full py-6 flex flex-col  overflow-y-scroll no-scrollbar">
      <h1 className="mx-auto text-5xl font-bold my-5">Al Reem Mart</h1>
      <div className="mx-auto flex justify-center items-center ">
        <h2 className="text-2xl font-bold ">Drinks</h2>
      </div>
      <div className="flex xs:flex-col md:flex-row xs:h-auto py-5 my-2 w-full  xs:overflow-y-scroll xs:no-scrollbar md:overflow-y-hidden">
        {menuItems?.map(menuItem => (
           <div className="flex flex-col items-center xs:w-[90%] md:w-[300px] h-auto mx-auto my-2">
           <div className="flex flex-col items-center py-2 w-full h-[330px] bg-white border rounded-lg shadow-lg">
             <h3 className="text-3xl font-bold my-2 ">{menuItem.name}</h3>
             <img
               src={`${baseUrl}${menuItem.image}`}
               className="w-[90%] h-[65%] rounded-lg"
               alt="house keeping"
             />
             <h3 className="text-3xl font-bold my-2 ">${menuItem.price}</h3>
           </div>{" "}
           <button 
              className="flex items-center justify-center mt-4 p-2 w-auto bg-blue-500 rounded-lg shadow-lg hover:bg-opacity-80 "
              onClick={() => handleAddToCart(menuItem)}
            >
             <IoIosAdd color={"white"} size={30} />
             <span className="text-3xl font-medium text-white">Add to cart</span>
           </button>
         </div>
        ))}
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
      <ToastContainer />
    </div>
  );
};

export default Drinks;
