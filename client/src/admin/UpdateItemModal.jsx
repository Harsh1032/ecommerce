import React from "react";

const UpdateItemModal = ({
  selectedItem,
  name,
  setName,
  price,
  setPrice,
  imagePreview,
  handleImageChange,
  handleRemoveImage,
  handleUpdateSubmit,
  setShowModal,
  fileInputRef,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl mb-4">Update {selectedItem.name}</h2>
        <form onSubmit={handleUpdateSubmit}>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              className="w-full h-[50px] px-5 rounded-lg shadow-lg outline-none"
            />
            <div className="w-full h-[50px] px-5 rounded-lg shadow-lg bg-white flex items-center">
              <span className="bg-white text-black text-xl">$</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                required
                className="w-full h-[50px] px-5 rounded-r-lg outline-none"
              />
            </div>
            <input
              type="file"
              onChange={handleImageChange}
              ref={fileInputRef} // Use the ref to control the input
              className="w-full p-3 rounded-lg shadow-lg bg-white"
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
              className="w-full h-[50px] px-5 text-white font-normal text-xl mt-4 p-2 bg-blue-500 rounded-lg shadow-lg hover:bg-opacity-80"
            >
              Update Item
            </button>
          </div>
        </form>
        <button
          className="mt-4 w-full h-[50px] px-5 text-gray-700 font-normal text-xl p-2 border rounded-lg hover:bg-gray-200"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateItemModal;
