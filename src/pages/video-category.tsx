import React, { useState } from "react";
import DeleteICONSVG from "../assets/SVG/deleteICON";
import EditICONSVG from "../assets/SVG/editICON";
import CloseICONSVG from "../assets/SVG/closeICON";
import { ToastContainer, toast } from "react-toastify";
import {
  useGetDataQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useCreatePostMutation,
} from "../api";
import { VideoCategorys } from "../types";
import Loader from "../components/loader";

interface StateProps {
  _id: string;
  category: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  value: string;
  setValue: (value: string) => void;
  isEditing: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSave,
  value,
  setValue,
  isEditing,
}) => {
  if (!isOpen) return null;
  return (
    <div className="absolute bg-[#2d2d2d7a] z-50 top-0 right-0 w-full h-full">
      <div className="flex items-center justify-center mt-8 w-auto">
        <div className="relative flex flex-col justify-center items-center p-3 min-h-[170px] min-w-[400px] bg-[#eeeeee] rounded-[7px]">
          <i
            className="absolute top-3 right-3 cursor-pointer"
            onClick={onClose}
          >
            <CloseICONSVG height={20} width={20} />
          </i>
          <div className="flex flex-row gap-4">
            <input
              onChange={(e) => setValue(e.target.value)}
              value={value}
              type="text"
              className="p-1 h-[30px] rounded-[5px] outline-none border border-[#959595]"
              placeholder="Enter category"
            />
            <button
              onClick={onSave}
              disabled={!value}
              className={`${
                value ? "bg-[#374ba4]" : "bg-gray-500"
              } text-[#f8f8f8] px-2 rounded-[7px]`}
            >
              {isEditing ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoCategory: React.FC = () => {
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const { data, refetch, isLoading } = useGetDataQuery({ url: "/video/get-category" });

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState("");
  const [editingCategory, setEditingCategory] = useState<StateProps | null>(
    null
  );

  const handleSaveCategory = async () => {
    const mutation = editingCategory ? updatePost : createPost;
    const path = editingCategory
      ? `/video/update-category/${editingCategory._id}`
      : `/video/create-category`;

    try {
      const response = await mutation({
        path,
        data: { category: categoryValue },
      });

      if (response?.data?.success) {
        toast.success(response?.data?.message, { autoClose: 3000 });
        refetch();
        setCategoryValue("");
        setCreateModalOpen(false);
        setEditModalOpen(false);
        setEditingCategory(null);
      } else {
        toast.error(
          `Failed to ${editingCategory ? "update" : "create"} category`
        );
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to continue?");
    if (confirmed) {
      try {
        const response = await deletePost({
          url: `/video/delete-category/${id}`,
        });
        if (response.data.success) {
          toast.success(response?.data?.message, { autoClose: 3000 });
          refetch();
        } else {
          toast.error("Failed to delete category");
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  const openCreateModal = () => {
    setCategoryValue("");
    setEditingCategory(null);
    setCreateModalOpen(true);
  };

  const openEditModal = (category: VideoCategorys) => {
    setCategoryValue(category.category);
    setEditingCategory(category);
    setEditModalOpen(true);
  };

  return (<React.Fragment>{isLoading &&<Loader/>}
    <div className="relative p-4 w-full bg-blue-100">

      <ToastContainer />
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSave={handleSaveCategory}
        value={categoryValue}
        setValue={setCategoryValue}
        isEditing={false}
      />
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSaveCategory}
        value={categoryValue}
        setValue={setCategoryValue}
        isEditing={true}
      />
      <div className="w-full">
        <button
          onClick={openCreateModal}
          className="bg-[#242424] rounded-[7px] text-[14px] text-[#f8f8f8] font-[600] px-3 py-1 text-center"
        >
          Create Category
        </button>
        <div className="overflow-x-auto flex justify-center">
          <table className="w-full flex flex-col lg:w-[50%] bg-white border border-gray-200">
            <thead className="">
              <tr className="bg-gray-100 flex flex-row justify-between px-4">
                <th>Categories</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {data?.map((member: VideoCategorys, index: number) => (
                <tr
                  key={index}
                  className="group hover:bg-gray-50 flex flex-row justify-between border-b px-4"
                >
                  <td className="py-2 px-4 ">{member?.category}</td>
                  <td className="py-2 px-4 flex gap-5 space-x-2">
                    <button onClick={() => handleDelete(member?._id)}>
                      <DeleteICONSVG height={20} width={20} fill={"#fe2828"} />
                    </button>
                    <button onClick={() => openEditModal(member)}>
                      <EditICONSVG height={20} width={20} fill={"#5b5a5a"} />
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

export default VideoCategory;
