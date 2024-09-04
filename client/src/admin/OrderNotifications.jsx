import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";

const OrderNotifications = () => {
  const [orders, setOrders] = useState([]);
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
  return (
    <div className="w-full h-full mt-5 xs:w-[90%] flex justify-center overflow-y-scroll no-scrollbar">
      <h2 className="text-xl mb-4">Current Orders</h2>
      <ul>
        {orders.map(order => (
          <li
            key={order._id}
            className="flex justify-between items-center bg-white p-2 rounded-lg mb-2"
          >
              <h3 className="font-bold">{order.name}</h3>
                  <p>Phone: {order.phoneNumber}</p>
                  <p>Room: {order.roomNumber}</p>
                  <p>Total Bill: ${order.totalBill}</p>
                  <p>Items: {order.items.map(item => (
                    <span key={item.name}>{item.quantity}x {item.name} (${item.price}), </span>
                  ))}</p>
                  <p>Date: {new Date(order.date).toLocaleString()}</p>
                  <p>Notes: {order.notes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderNotifications;
