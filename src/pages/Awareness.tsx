import { useNavigate } from "react-router-dom";

import { useDeletePostMutation, useGetDataQuery } from "../api";
import loginImage from "../assets/login_2.svg";
import Loader from "../components/loader";
import DeleteICONSVG from "../assets/SVG/deleteICON";
import EditICONSVG from "../assets/SVG/editICON";
import { useState } from "react";
import ConfirmDeleteModal from "../components/modal/DeleteModal";
import { toast } from "react-toastify";

interface AwarenessType {
  _id: string;
  title: string;
  category: string;

  createdAt: string;
  image: string;
  action: string;
}

const Awareness = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetDataQuery({ url: "/awareness" });

  const [deletPost] = useDeletePostMutation();

  const [isModalOpen, setModalOpen] = useState({
    condition: false,
    id: "",
  });

  const handleCloseModal = () => {
    setModalOpen({
      condition: false,
      id: "",
    });
  };

  const deletHandler = (id) => {
    console.log(id, "from handler");
    setModalOpen((prev) => ({
      ...prev,
      condition: !prev.condition,
      id: id,
    }));
  };

  const handleConfirmDelete = () => {
    // Handle the delete action here
    toast.loading("checking Details");
    console.log("Item deleted", isModalOpen.id);
    deletPost({
      url: `/awareness/${isModalOpen.id}`,
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

  console.log(data, error, "awareness");
  return (
    <>
      {isModalOpen.condition && (
        <ConfirmDeleteModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
      )}
      <div className="flex justify-center w-full p-4 bg-blue-100">
        {/* {isLoading && <Loader />} */}
        <div className="w-full ">
          <div className="flex justify-between">
            <button
              onClick={() => navigate("/creat-awareness")}
              className="my-4 bg-[#333] text-[#f8f8f8] px-4 py-1 rounded-[7px]"
            >
              Creat Awareness
            </button>
            <button
              onClick={() => navigate("/upload-video")}
              className="my-4 bg-[#333] text-[#f8f8f8] px-4 py-1 rounded-[7px]"
            >
              Awarness Category
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="">
                <tr className="flex flex-row justify-between px-4 bg-gray-100">
                  <th className="px-4 py-2 border-b">Title</th>
                  <th className="px-4 py-2 border-b ml-14">category</th>
                  <th className="px-4 py-2 border-b">Posted At</th>
                  <th className="px-4 py-2 border-b">Image</th>
                  <th className="px-4 py-2 border-b">Action</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {data?.map((item: AwarenessType, index: number) => (
                  <tr
                    key={index}
                    className="flex flex-row items-center justify-between px-4 border-b group hover:bg-gray-50"
                  >
                    <td className="px-4 py-2 ">{item?.title}</td>
                    <td className="px-4 py-2 ">{item?.category}</td>
                    <td className="px-4 py-2 ">
                      {item?.createdAt
                        ? new Date(
                            item?.createdAt?.split("T")[0]
                          ).toLocaleDateString()
                        : ""}
                    </td>
                    <td className="px-4 py-2 ">
                      <img
                        src={item?.image}
                        alt="Awareness Image"
                        className="w-16 h-16"
                      />
                    </td>
                    <td className="flex gap-5 px-4 py-2 space-x-2">
                      <button
                        className=""
                        onClick={() => deletHandler(item?._id)}
                      >
                        <DeleteICONSVG
                          heignt={20}
                          width={20}
                          fill={"#fe2828"}
                        />
                      </button>
                      <button
                        onClick={() => navigate(`/awareness/${item?._id}`)}
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
    </>
  );
};
export default Awareness;
