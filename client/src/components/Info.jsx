import React from "react";
import { Link } from "react-router-dom";

const Info = () => {
  return (
    <div className="h-[100%] w-full py-6 flex flex-col  overflow-y-scroll no-scrollbar">
      <h1 className="mx-auto text-5xl font-bold my-5">Al Reem Mart</h1>
      <div className="mx-auto flex justify-center items-center ">
        <h2 className="text-2xl font-bold ">Info</h2>
      </div>
      <div className="flex flex-col xs:h-auto  py-5 my-2 w-full">
        <div className="flex flex-col p-5 xs:w-[90%] md:w-auto xs:h-auto md:h-[600px] bg-white border rounded-lg shadow-lg mx-auto my-2">
          <h2 className="text-3xl font-bold my-2 ">Welcome to Al Reem Mart!</h2>
          <span className="text-xl font-normal my-2">
            Thank you for booking with us. We hope you have a wonderful stay!
          </span>
          <h3 className="text-2xl font-bold my-2 ">Important Information:</h3>
          <h3 className="text-2xl font-bold my-2 ">
            Wifi Password:{" "}
            <span className="text-2xl font-normal my-2">00000</span>
          </h3>
          <h3 className="text-2xl font-bold my-2 ">
            Phone Numbers:
            <ul className="pl-5">
              <li className="text-2xl font-normal my-2">Owner: 00000</li>
              <li className="text-2xl font-normal my-2">Guard: 0000</li>
              <li className="text-2xl font-normal my-2">
                Laundry Room (1st Floor, Room 110)
              </li>
            </ul>
          </h3>
          <h3 className="text-2xl font-bold my-2 ">
            Services Note:{" "}
            <span className="text-2xl font-normal my-2">
              Cleaning requires at least 1 hour and must be requested in
            </span>
            <span className="text-2xl font-normal my-2">advance.</span>
          </h3>
          <h3 className="text-2xl font-bold my-2 ">
            Tour Guide:{" "}
            <span className="text-2xl font-normal my-2">
              Please book in advance; up to 4 people per tour.
            </span>
          </h3>
          <h3 className="text-2xl font-bold my-2 ">
            Food Delivery:{" "}
            <span className="text-2xl font-normal my-2">
              Requires at least 1 hour for delivery
            </span>
          </h3>
        </div>
      </div>
      <div className="h-[80px] w-full flex ">
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

export default Info;
