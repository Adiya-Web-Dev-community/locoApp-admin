import { useNavigate } from "react-router-dom";
import { useDeletePostMutation, useGetDataQuery } from "../api";
import DeleteICONSVG from "../assets/SVG/deleteICON";
import EditICONSVG from "../assets/SVG/editICON";
import Loader from "../components/loader";
import { UserTypes } from "../types";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Users = () => {
    const navigate = useNavigate();
    const { data, refetch, isLoading } = useGetDataQuery({ url: "/all-user" });
    const [deletePost] = useDeletePostMutation();
    const handleDelete = async (
        id: string,
      ) => {
        if (window.confirm("Are you sure you want to continue?")) {
          try {
            const response = await deletePost({
              url: `/userDelete/${id}`,
            });
    
            if (response?.data?.success) {
              toast.success(response.data.message, {
                autoClose: 3000,
              });
              refetch();
            } else {
              toast.error("Failed to delete user");
            }
          } catch (error) {
            toast.error("Something went wrong");
          }
        }
      };
  return (
    <div className="bg-blue-100  container mx-auto px-4 py-4">
         {isLoading &&<Loader/>}
         <ToastContainer/>
      <table className="min-w-full rounded-sm  border-collapse block md:table">
        <thead className="block md:table-header-group ">
          <tr className="border  border-gray-200 md:border-none block md:table-row">
            <th className="bg-gray-100 p-2 text-left font-medium text-gray-700 block md:table-cell">
              Image
            </th>
            <th className="bg-gray-100 p-2 text-left font-medium text-gray-700 block md:table-cell">
              Name
            </th>
            <th className="bg-gray-100 p-2 text-left font-medium text-gray-700 block md:table-cell">
              Email
            </th>
            <th className="bg-gray-100 p-2 text-left font-medium text-gray-700 block md:table-cell">
              Phone
            </th>
            <th className="bg-gray-100 p-2 text-left font-medium text-gray-700 block md:table-cell">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {data?.map((user:UserTypes, index:number) => (
            <tr
              key={index}
              className="bg-white border border-gray-200 md:border-none block md:table-row"
            >
              <td className="p-2 block md:table-cell">
                <img
                  src={user?.image}
                  alt={user?.name}
                  className="w-12 h-12 rounded-full"
                />
              </td>
              <td className="p-2 block md:table-cell">{user?.name}</td>
              <td className="p-2 block md:table-cell">{user?.email}</td>
              <td className="p-2 block md:table-cell">{user?.mobile}</td>
              <td className="p-2 block md:table-cell">
                <div className="flex flex-row gap-5">
                  <button onClick={()=>handleDelete(user?._id)}>
                    <DeleteICONSVG height={20} width={20} fill={"#fe2828"} />
                  </button>
                  <button     onClick={() => navigate(`/users/${user?._id}`)}>
                    <EditICONSVG height={20} width={20} fill={"#5b5a5a"} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
