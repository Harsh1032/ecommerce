import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditableImage = ({ link, setLink }) => {
    const handleFileChange = async (ev) => {
      const files = ev.target.files;
      if (files?.length === 1) {
        const data = new FormData();
        data.set('file', files[0]);
  
        const uploadPromise = fetch('/api/upload', {
          method: 'POST',
          body: data,
        }).then(response => {
          if (response.ok) {
            return response.json().then(link => {
              setLink(link);
            });
          }
          throw new Error('Something went wrong');
        });
  
        await toast.promise(uploadPromise, {
          pending: 'Uploading...',
          success: 'Upload complete!',
          error: 'Upload failed!',
        });
      }
    };
  
    return (
      <>
        <ToastContainer />
        {link ? (
          <img
            className="rounded-lg w-full h-full mb-1"
            src={link}
            alt="Uploaded"
            style={{ width: 250, height: 250 }}
          />
        ) : (
          <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
            No image
          </div>
        )}
        <label>
          <input type="file" className="hidden" onChange={handleFileChange} />
          <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
            Change image
          </span>
        </label>
      </>
    );
  };

export default EditableImage