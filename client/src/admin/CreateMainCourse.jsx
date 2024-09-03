import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import UpdateItemModal from "./UpdateItemModal";

const CreateMainCourse = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [activeItem, setActiveItem] = useState("Add Items");
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Use a ref to control the file input
  const fileInputRef = useRef(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview(null);
    }
  };

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/menu-items/getItems`);
      setMenuItems(response.data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        `${baseUrl}/api/menu-items/createMenuItem`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Menu item created:", response.data);
      
      fetchMenuItems();
      // Clear the form fields after successful submission
      setName("");
      setPrice("");
      setImage(null);
      setImagePreview(null);
      // Reset the file input field
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error creating menu item:", error);
    }
  };

  const handleUpdateSubmit = async () => {
    const formData = new FormData();
    formData.append("id", selectedItem._id);
    formData.append("name", name);
    formData.append("price", price);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.put(
        `${baseUrl}/api/menu-items/updateItems`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Menu item updated:", response.data);
      fetchMenuItems(); // Refresh the menu items list
      setShowModal(false); // Close the modal after update
      setSelectedItem(null);
      setName("");
      setPrice("");
      setImage(null);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`${baseUrl}/api/menu-items/deleteItems`, {
        data: { id: itemId },
      });
      fetchMenuItems(); // Refresh the items list after deletion
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setName(item.name);
    setPrice(item.price);
    setImagePreview(`${baseUrl}${item.image}`);
    setShowModal(true); // Open the modal
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    // Reset the file input field
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex md:mt-2 xs:mt-3 md:w-full xs:justify-between xs:w-[90%] xs:m-auto">
        <div
          className={` ${
            activeItem === "Add Items"
              ? "bg-orange-500 text-white w-auto h-auto p-3 border-0 rounded-lg shadow-lg"
              : "w-auto h-auto p-3 bg-white border-0 rounded-lg shadow-lg hover:bg-orange-500 hover:text-white text-black"
          }`}
          onClick={() => handleItemClick("Add Items")}
        >
          Add Items
        </div>
        <div
          className={`${
            activeItem === "Update Items"
              ? "bg-orange-500 text-white w-auto h-auto p-3 border-0 rounded-lg shadow-lg"
              : "w-auto h-auto p-3 bg-white border-0 rounded-lg shadow-lg hover:bg-orange-500 hover:text-white text-black "
          }`}
          onClick={() => handleItemClick("Update Items")}
        >
          Update Items
        </div>
        <div
          className={` ${
            activeItem === "Delete Items"
              ? "bg-orange-500 text-white w-auto h-auto p-3 border-0 rounded-lg shadow-lg"
              : "w-auto h-auto p-3 bg-white border-0 rounded-lg shadow-lg hover:bg-orange-500 hover:text-white text-black"
          }`}
          onClick={() => handleItemClick("Delete Items")}
        >
          Delete Items
        </div>
      </div>
      <div className="w-full xs:mt-5 h-full flex justify-center overflow-y-scroll no-scrollbar">
        {activeItem === "Add Items" && (
          <form
            onSubmit={handleSubmit}
            className="md:w-full h-full flex md:flex-row xs:flex-col xs:w-[90%]"
          >
            <div className="mx-auto flex xs:flex-col gap-8 xs:w-full md:w-[50%] xs:items-center pt-[30px]">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
                className="md:w-[80%] xs:w-full xs:h-[50px] px-5 rounded-lg shadow-lg outline-none"
              />
              <div className="md:w-[80%] xs:w-full xs:h-[50px] px-5 rounded-lg shadow-lg bg-white flex items-center">
                <span className="bg-white text-black text-xl">$</span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
                  required
                  className="md:w-[80%] xs:w-full xs:h-[50px] px-5 rounded-r-lg outline-none"
                />
              </div>
            </div>
            <div className="flex xs:flex-col gap-8 xs:w-full md:w-[50%] xs:items-center pt-[30px] md:justify-start">
              <input
                type="file"
                onChange={handleImageChange}
                ref={fileInputRef} // Use the ref to control the input
                className="md:w-[80%] xs:w-full p-3 rounded-lg shadow-lg bg-white w-full"
                accept="image/*"
              />
              {imagePreview && (
                <div className="flex justify-between">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ maxWidth: "200px", marginTop: "10px" }}
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                  >
                    Delete
                  </button>
                </div>
              )}
              <button
                type="submit"
                className="md:w-[80%] xs:w-full xs:h-[50px] px-5 text-white font-normal text-xl mt-4 p-2 bg-blue-500 rounded-lg shadow-lg hover:bg-opacity-80"
              >
                Create Main Course Item
              </button>
            </div>
          </form>
        )}
        {activeItem === "Update Items" && (
          <div className="w-full h-full mt-5 xs:w-[90%]">
          <h2 className="text-xl mb-4">Select an item to update</h2>
          <ul>
            {menuItems.map((item) => (
              <li
                key={item._id}
                className="flex justify-between items-center bg-white p-2 rounded-lg mb-2"
              >
                <img
                  src={`${baseUrl}${item.image}`}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <span className="text-black text-xl">{item.name}</span>
                <button
                  className="bg-blue-500 text-white text-lg px-3 py-1 rounded-lg shadow-lg hover:bg-opacity-80"
                  onClick={() => handleSelectItem(item)}
                >
                  Update
                </button>
              </li>
            ))}
          </ul>
        </div>
        )}
         {activeItem === "Delete Items" && (
        <div className="w-full h-full mt-5 xs:w-[90%]">
          <h2 className="text-xl mb-4">Select an item to delete</h2>
          <ul>
            {menuItems.map((item) => (
              <li
                key={item._id}
                className="flex justify-between items-center bg-white p-2 rounded-lg mb-2"
              >
                <img
                  src={`${baseUrl}${item.image}`}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <span className="text-black text-xl">{item.name}</span>
                <button
                  className="bg-red-500 text-white text-lg px-3 py-1 rounded-lg shadow-lg hover:bg-opacity-80"
                  onClick={() => handleDeleteItem(item._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>

      {/* Modal */}
      {showModal && (
        <UpdateItemModal
          selectedItem={selectedItem}
          name={name}
          setName={setName}
          price={price}
          setPrice={setPrice}
          imagePreview={imagePreview}
          handleImageChange={handleImageChange}
          handleRemoveImage={handleRemoveImage}
          handleUpdateSubmit={handleUpdateSubmit}
          setShowModal={setShowModal}
          fileInputRef={fileInputRef}
        />
      )}
    </div>
  );
};

export default CreateMainCourse;
