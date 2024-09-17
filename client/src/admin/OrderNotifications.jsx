import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";

const OrderNotifications = () => {
  const [orders, setOrders] = useState([]);
  const [activeItem, setActiveItem] = useState("Current Orders"); // Default to Current Orders
  const socketRef = useRef();
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    // Fetch initial orders from the backend
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/order/getOrders`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();

    // Connect to the server for real-time updates
    socketRef.current = io(`${baseUrl}`);

    // Listen for new orders
    socketRef.current.on("newOrder", (order) => {
      setOrders((prevOrders) => [order, ...prevOrders]); // Add new orders to the top of the list
    });

    // Clean up on component unmount
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const markOrderAsCompleted = async (orderId) => {
    try {
      await axios.patch(`${baseUrl}/api/order/completeOrder`, {
        id: orderId,
      });
      console.log("Order marked as completed");

      // After marking as completed, fetch the updated list
      fetchOrders();
    } catch (error) {
      console.error("Error marking order as completed:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/order/getOrders`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const filteredOrders =
    activeItem === "Current Orders"
      ? orders.filter((order) => !order.isCompleted)
      : orders.filter((order) => order.isCompleted);

  const handleItemClick = (item) => {
    setActiveItem(item); // Update active item (either Current Orders or Past Orders)
  };

  return (
    <div className="w-full h-full flex flex-col items-center mx-auto overflow-y-scroll no-scrollbar">
      <div className="flex w-full justify-around mb-4">
        <button
          className={`${
            activeItem === "Current Orders"
              ? "bg-orange-500 text-white w-auto h-auto p-3 border-0 rounded-lg shadow-lg"
              : "w-auto h-auto p-3 bg-white border-0 rounded-lg shadow-lg hover:bg-orange-500 hover:text-white text-black "
          }`}
          onClick={() => handleItemClick("Current Orders")}
        >
          Current Orders
        </button>
        <button
          className={`${
            activeItem === "Past Orders"
              ? "bg-orange-500 text-white w-auto h-auto p-3 border-0 rounded-lg shadow-lg"
              : "w-auto h-auto p-3 bg-white border-0 rounded-lg shadow-lg hover:bg-orange-500 hover:text-white text-black "
          }`}
          onClick={() => handleItemClick("Past Orders")}
        >
          Past Orders
        </button>
      </div>

      <ul className="w-full">
        {filteredOrders.map((order) => (
          <li key={order._id} className="bg-white p-4 rounded-lg mb-2">
            <p className="font-normal">Name: {order.name}</p>
            <p className="font-normal">Phone: {order.phoneNumber}</p>
            <p className="font-normal">Room: {order.roomNumber}</p>
            <p className="font-normal">Total Bill: ${order.totalBill}</p>
            <p className="font-normal">
              Items:{" "}
              {order.items.map((item) => (
                <span key={item.name}>
                  {item.quantity}x {item.name} (JOD{item.price}),{" "}
                </span>
              ))}
            </p>
            <p className="font-normal">
              Ordered Date: {new Date(order.createdAt).toLocaleString()}
            </p>
            <p className="font-normal">
              Tour Date:{" "}
              {order.date ? new Date(order.date).toLocaleString() : "null"}
            </p>

            <p className="font-normal">Notes: {order.notes}</p>

            {/* Show 'Complete' button for current orders */}
            {activeItem === "Current Orders" && (
              <button
                className="bg-green-500 text-white px-4 py-2 mt-4 rounded-lg shadow-lg hover:bg-opacity-80"
                onClick={() => markOrderAsCompleted(order._id)}
              >
                Mark as Complete
              </button>
            )}
            {activeItem === "Past Orders" && (
              <button className="bg-green-500 text-white px-4 py-2 mt-4 rounded-lg shadow-lg">
                Completed
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderNotifications;
