import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetDataQuery, useUpdatePostMutation } from '../api';
import { useParams } from 'react-router-dom';
import Loader from './loader';
import uploadImage from '../firebase_image/image';

const UserUpdate = () => {
  const {id}=useParams()
  const [updatePost] = useUpdatePostMutation();
  const { data, isLoading } = useGetDataQuery({ url: `/getuser/${id}` });
  const [user, setCurrentUser] = useState({
    image: '',
    name: '',
    email: '',
    mobile: '',
  });
  useEffect(()=>{
    setCurrentUser({
      image: data?.image,
      name: data?.name,
      email: data?.email,
      mobile: data?.mobile,
    })
  },[data]);
 
console.log("user Data in this >>",data)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({ ...user, [name]: value });
  };
  const [progressStatus, setProgressStatus] = useState<number | null>(null);
  
  const handleImageChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target?.files?.[0];
    if (selectedFile) {
      try {
        const imageUrl = await uploadImage(
          selectedFile.name,
          selectedFile,
          setProgressStatus
        );
        console.log(imageUrl, selectedFile, '<<frommodal>>');
        setCurrentUser({ ...user, image: imageUrl });
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Error uploading image');
      }
  }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updatePost({
        path: `/update-user/${id}`,
        data: user,
      });

      if (response?.data?.success) {
        toast.success(response.data.message, {
          autoClose: 5000,
        });
    
      } else {
        toast.error("Failed to Update User");
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };
  return (
    <div className=" w-full bg-gradient-to-r from-blue-100 to-purple-200 flex justify-center items-center p-6">
        {isLoading &&<Loader/>}
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-xl transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Edit User</h2>
        <form onSubmit={handleSubmit}>
        {user?.image && (
            <div className=" relative mb-6 flex justify-center">
              <img
                src={user.image}
                alt="Profile"
                className="w-20 h-20 object-cover rounded-full shadow-lg transform transition duration-500 hover:scale-110"
              />
               
            </div>
          )}
          <div className="relative outline-none mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 border outline-none border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {progressStatus !== null && progressStatus !== 0 && (
                  <>
                    <div className="pt-2 inset-0 z-10 flex flex-row gap-2 items-end">
                      <p className='text-black text-[12px]'>uploading</p>
                      <div
                        className="h-1 bg-blue-400 rounded-md mx-[1px] mb-[1px]"
                        style={{ width: `${progressStatus}%` }}
                     
                      ></div>
                    </div>
                  </>
                )}
          </div>
         
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={user?.name || ''}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={user?.email || ''}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Phone</label>
            <input
              type="text"
              name="mobile"
              value={user?.mobile || ''}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-2xl transform transition duration-500 hover:scale-110"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserUpdate;
