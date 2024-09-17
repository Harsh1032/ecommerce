import React, { useState, useEffect } from "react";
import CartLogo from "../assets/cart.png";
import { Link } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { useCart } from "./CartContext";
import axios from "axios";
import io from "socket.io-client"; // Import socket.io-client
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainCourse = () => {
  const { addToCart, cart } = useCart();
  const [menuItems, setMenuItems] = useState([]);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    // Fetch the initial snacks
    fetchMenuItems();

    // Connect to the socket server
    const socket = io(baseUrl);

    // Listen for the 'menuItemDoc' event and update the snack list
    socket.on("menuItemDoc", (menuItemDoc) => {
      setMenuItems((prevItems) => [...prevItems, menuItemDoc]);
      toast.success("A new main course  has been added!");
    });

    // Listen for the 'updateSnack' event and update the snack list
    socket.on("updatedMenuItem", (updatedMenuItem) => {
      setMenuItems((prevItems) => {
        return prevItems.map((item) =>
          item._id === updatedMenuItem._id ? updatedMenuItem : item
        );
      });
      toast.info("A main course has been updated!");
    });

    // Listen for the 'deleteSnack' event and remove the snack from the list
    socket.on("deleteMenuItem", ({ id }) => {
      setMenuItems((prevItems) => prevItems.filter((item) => item._id !== id));
      toast.error("A main course has been deleted!");
    });

    // Clean up the socket connection on component unmount
    return () => socket.disconnect();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/menu-items/getItems`);
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
        <h2 className="text-2xl font-bold ">Main Courses</h2>
      </div>
      <div className="xs:flex xs:flex-col md:grid md:grid-cols-4 md:gap-4 xs:h-auto py-5 my-2 w-full  xs:overflow-y-scroll xs:no-scrollbar md:overflow-y-hidden">
        {menuItems?.map((menuItem) => (
          <div className="flex flex-col items-center xs:w-[90%] md:w-[300px] h-auto mx-auto my-2">
            <div className="flex flex-col items-center py-2 w-full h-[330px] bg-white border rounded-lg shadow-lg">
              <h3 className="text-3xl font-bold my-2 ">{menuItem.name}</h3>
              <img
                src={`${baseUrl}${menuItem.image}`}
                className="w-[90%] h-[65%] rounded-lg"
                alt="house keeping"
              />
              <h3 className="text-3xl font-bold my-2 ">JOD{menuItem.price}</h3>
            </div>{" "}
            <button
              className="flex items-center justify-center mt-4 p-2 w-auto bg-blue-500 rounded-lg shadow-lg hover:bg-opacity-80 "
              onClick={() => handleAddToCart(menuItem)}
            >
              <IoIosAdd color={"white"} size={30} />
              <span className="text-3xl font-medium text-white">
                Add to cart
              </span>
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

export default MainCourse;
