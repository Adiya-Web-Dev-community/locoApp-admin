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
import Pagination from "../components/pagination/Pagination";
import { IoIosSend } from "react-icons/io";
import ConfirmDeleteModal from "../components/modal/DeleteModal";
import AwarenessCategoryForm from "../forms/AwarenessCategoryForm";
import VideoCategoryForm from "../forms/VideoCategoryForm";

// interface StateProps {
//   _id: string;
//   category: string;
// }

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: () => void;
//   value: string;
//   setValue: (value: string) => void;
//   isEditing: boolean;
// }

// const Modal: React.FC<ModalProps> = ({
//   isOpen,
//   onClose,
//   onSave,
//   value,
//   setValue,
//   isEditing,
// }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="absolute bg-[#2d2d2d7a] z-50 top-0 right-0 w-full h-full">
//       <div className="flex items-center justify-center w-auto mt-8">
//         <div className="relative flex flex-col justify-center items-center p-3 min-h-[170px] min-w-[400px] bg-[#eeeeee] rounded-[7px]">
//           <i
//             className="absolute cursor-pointer top-3 right-3"
//             onClick={onClose}
//           >
//             <CloseICONSVG height={20} width={20} />
//           </i>
//           <div className="flex flex-row gap-4">
//             <input
//               onChange={(e) => setValue(e.target.value)}
//               value={value}
//               type="text"
//               className="p-1 h-[30px] rounded-[5px] outline-none border border-[#959595]"
//               placeholder="Enter category"
//             />
//             <button
//               onClick={onSave}
//               disabled={!value}
//               className={`${
//                 value ? "bg-[#374ba4]" : "bg-gray-500"
//               } text-[#f8f8f8] px-2 rounded-[7px]`}
//             >
//               {isEditing ? "Update" : "Save"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const VideoCategory: React.FC = () => {
  // const [createPost] = useCreatePostMutation();
  // const [updatePost] = useUpdatePostMutation();
  // const [deletePost] = useDeletePostMutation();
  const { data, refetch, isLoading } = useGetDataQuery({
    url: "/video/get-category",
  });

  // const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  // const [isEditModalOpen, setEditModalOpen] = useState(false);

  const [isCategoryForm, setCategoryForm] = useState({
    creat: false,
    updateId: "",
  });
  const [updateData, setUpdateDate] = useState({
    name: "",
  });

  const [isModalOpen, setModalOpen] = useState({
    condition: false,
    id: "",
  });

  // const [categoryValue, setCategoryValue] = useState("");
  // const [editingCategory, setEditingCategory] = useState<StateProps | null>(
  //   null
  // );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  //calculation of page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentCompanies = data?.slice(indexOfFirstItem, indexOfLastItem);

  console.log(currentCompanies, "pagination");

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const [deletPost] = useDeletePostMutation();

  // const handleSaveCategory = async () => {
  //   const mutation = editingCategory ? updatePost : createPost;
  //   const path = editingCategory
  //     ? `/video/update-category/${editingCategory._id}`
  //     : `/video/create-category`;

  //   try {
  //     const response = await mutation({
  //       path,
  //       data: { category: categoryValue },
  //     });

  //     if (response?.data?.success) {
  //       toast.success(response?.data?.message, { autoClose: 3000 });
  //       refetch();
  //       setCategoryValue("");
  //       setCreateModalOpen(false);
  //       setEditModalOpen(false);
  //       setEditingCategory(null);
  //     } else {
  //       toast.error(
  //         `Failed to ${editingCategory ? "update" : "create"} category`
  //       );
  //     }
  //   } catch (error) {
  //     toast.error("An error occurred");
  //   }
  // };

  // const handleDelete = async (id: string) => {
  //   const confirmed = window.confirm("Are you sure you want to continue?");
  //   if (confirmed) {
  //     try {
  //       const response = await deletePost({
  //         url: `/video/delete-category/${id}`,
  //       });
  //       if (response.data.success) {
  //         toast.success(response?.data?.message, { autoClose: 3000 });
  //         refetch();
  //       } else {
  //         toast.error("Failed to delete category");
  //       }
  //     } catch (error) {
  //       toast.error("Something went wrong");
  //     }
  //   }
  // };

  // const openCreateModal = () => {
  //   setCategoryValue("");
  //   setEditingCategory(null);
  //   setCreateModalOpen(true);
  // };

  // const openEditModal = (category: VideoCategorys) => {
  //   setCategoryValue(category.category);
  //   setEditingCategory(category);
  //   setEditModalOpen(true);
  // };

  const handlingCategory = () => {
    setCategoryForm((prev) => ({
      ...prev,
      creat: !prev.creat,
    }));
    setUpdateDate({
      name: "",
    });
  };

  const handleCloseModal = () => {
    setModalOpen({
      condition: false,
      id: "",
    });
  };

  const deletCategory = (id) => {
    console.log(id, "from handler");
    setModalOpen((prev) => ({
      ...prev,
      condition: !prev.condition,
      id: id,
    }));
  };
  const updateCategory = (category) => {
    setCategoryForm((prev) => ({
      ...prev,
      updateId: category._id,
    }));

    setUpdateDate((prev) => ({
      ...prev,
      name: category.name,
    }));
  };

  const handleConfirmDelete = () => {
    // Handle the delete action here
    toast.loading("checking Details");
    console.log("Item deleted", isModalOpen.id);
    deletPost({
      url: `/video/delete-category/${isModalOpen.id}`,
    })
      .then((res) => {
        if (res.data.success) {
          toast.dismiss();
          toast.success(`${res.data.message}`);
        }
        console.log(res);
      })
      .catch((error) => {
        toast.dismiss();
        toast.error("Not successfull to delete");
      });
    setModalOpen({
      condition: false,
      id: "",
    });
  };

  const categoryHeading = ["Category Name", "Setting"];
  return (
    <React.Fragment>
      {isLoading && <Loader />}
      {/* <div className="relative w-full p-4 bg-blue-100">

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
        <div className="flex justify-center overflow-x-auto">
          <table className="w-full flex flex-col lg:w-[50%] bg-white border border-gray-200">
            <thead className="">
              <tr className="flex flex-row justify-between px-4 bg-gray-100">
                <th>Categories</th>
                <th className="px-4 py-2 border-b">Action</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {data?.map((member: VideoCategorys, index: number) => (
                <tr
                  key={index}
                  className="flex flex-row justify-between px-4 border-b group hover:bg-gray-50"
                >
                  <td className="px-4 py-2 ">{member?.category}</td>
                  <td className="flex gap-5 px-4 py-2 space-x-2">
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
    </div> */}
      <>
        {(isCategoryForm.creat || isCategoryForm.updateId) && (
          <VideoCategoryForm
            singleCategory={updateData}
            isCategoryForm={isCategoryForm}
            setCategoryForm={setCategoryForm}
          />
        )}

        {isModalOpen.condition && (
          <ConfirmDeleteModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleConfirmDelete}
          />
        )}
        <section
          className={`  md:pl-0 p-4 h-full w-full rounded-md   mx-auto [&::-webkit-scrollbar]:hidden `}
        >
          <section
            className={` md:p-8 p-6 h-full  text-gray-600  border-gray-200 
          rounded-md   max-w-full w-full `}
          >
            <div className="flex items-center mb-2 md:mb-6">
              <h1 className=" text-[28px] font-bold md:text-4xl font-mavenPro ">
                Video Category
              </h1>
            </div>
            <div className="flex justify-between mb-4">
              <div className={`flex items-center   `}>
                <input
                  type="search"
                  placeholder={` Search
                `}
                  className={` p-2 text-sm md:text-base  sm:px-4 py-1 border-[2px] border-transparent 
                 bg-slate-50 focus:border-gray-100
              shadow-inner rounded-[0.26rem] outline-none `}
                  // value={searchQuery}
                  // onChange={(e) => setSearchQuery(e.target.value)}
                  // onFocus={() => setCurrentPage(1)}
                />
              </div>
              <div className="relative flex items-center self-end ">
                <button
                  className={` px-2 py-1 
                         bg-[#1f3c88] hover:bg-[#2d56bb] text-white
                    }    rounded shadow-xl md:px-4 md:py-2  sm:self-center`}
                  onClick={handlingCategory}
                >
                  <span className="hidden md:inline-block">Creat Category</span>

                  <IoIosSend className="w-6 h-6 md:hidden" />
                </button>
              </div>
            </div>
            <section
              className={`w-full overflow-auto   border-2 [&::-webkit-scrollbar]:hidden rounded-lg  shadow-md bg-white`}
            >
              {/* min-w-[900px] */}
              <section className="grid gap-4 p-2 pb-2 min-w-[600px] font-medium border-gray-100 grid-cols-customeCategory md:font-semibold font-mavenPro bg-white">
                <p className="pl-2 text-gray-600 md:text-lg">SrNo.</p>
                {/* <p className="pl-10 text-gray-600 md:text-lg">Logo</p> */}

                {categoryHeading.map((heading, index) => (
                  <p
                    key={index}
                    className={`  text-gray-600 md:text-lg ${
                      index !== 0 ? "justify-self-center" : "ml-6"
                    }`}
                  >
                    {heading.charAt(0).toUpperCase() + heading.slice(1)}
                  </p>
                ))}
              </section>
              {/* min-w-[900px] */}
              <div className=" h-[380px] overflow-y-auto [&::-webkit-scrollbar]:hidden min-w-[600px] bg-gray-50">
                {data?.map((category, i) => (
                  <section
                    key={i}
                    className="grid items-center gap-6 py-2 pl-6 pr-4 border-t-2 border-gray-200 grid-cols-customeCategory group hover:bg-gray-50"
                  >
                    <span>{i + 1}</span>

                    <span className="ml-2 text-sm font-semibold text-gray-600 md:text-base">
                      {category?.category}
                    </span>

                    <div className="flex justify-center gap-4">
                      <button
                        className="px-3 text-sm py-2 text-white  rounded-md bg-[#1f3c88] hover:bg-[#2d56bb]"
                        onClick={() => updateCategory(category)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-2 text-sm text-white rounded-md bg-rose-600 hover:bg-rose-700"
                        onClick={() => deletCategory(category._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </section>
                ))}
              </div>
            </section>
            <Pagination
              currentPage={currentPage}
              apiData={data}
              itemsPerPage={itemsPerPage}
              handleClick={handleClick}
            />
          </section>
        </section>
      </>
    </React.Fragment>
  );
};

export default VideoCategory;
