import EditICONSVG from "../assets/SVG/editICON";
import DeleteICONSVG from "../assets/SVG/deleteICON";
import { useNavigate } from "react-router-dom";
import { useDeletePostMutation, useGetDataQuery } from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BlogSTyepes } from "../types";
import React from "react";

const BlogList = () => {
  const navigate = useNavigate();
  const [deletePost] = useDeletePostMutation();
  const { data:response,refetch } = useGetDataQuery({ url: "/blog/getallblogs" });
  const handleDelete = async (id:string) => {
    const confirmed = window.confirm("Are you sure you want to continue?");
    if (confirmed) {
      try {
        const response = await deletePost({
          url: `/blog/delete-blog/${id}`,
        });
        if (response.data.success) {
          toast.success(response?.data?.message, {
            autoClose: 3000,
          });
          refetch();
        } else {
          toast.error("Failed to delete category");
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };
  console.log("blog data>>",response)
  return (
  <React.Fragment>
      <ToastContainer/>
    <div className="flex justify-center p-4 w-full">
    
      <div className="w-full">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="">
              <tr className="bg-gray-100 flex flex-row justify-between px-4">
                <th>Image</th>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Posted At</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {response?.data?.map((member: BlogSTyepes, index: number) => (
                <tr
                  key={index}
                  className="group hover:bg-gray-50 flex flex-row justify-between   border-b px-4"
                >
                  <td className="py-2 px-4  flex items-center">
                    <img
                      src={member?.thumnail}
                      alt={member.title}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                  </td>
                  <td className="py-2 px-4 ">{member?.title}</td>

                  <td className="py-2 px-4">
                    {member?.createdAt
                      ? new Date(member?.createdAt).toLocaleDateString()
                      : ""}
                  </td>
                  <td className="py-2 px-4  flex gap-5 space-x-2">
                    <button className="" onClick={()=>handleDelete(member?._id)}>
                      <DeleteICONSVG heignt={20} width={20} fill={"#fe2828"} />
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/update-blog/${member?._id}`)
                      }
                    >
                      <EditICONSVG heignt={20} width={20} fill={"#5b5a5a"} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </React.Fragment>
  );
};
export default BlogList;
