import { useNavigate } from "react-router-dom";

import { useDeletePostMutation, useGetDataQuery } from "../api";
import Loader from "../components/loader";
import DeleteICONSVG from "../assets/SVG/deleteICON";
import EditICONSVG from "../assets/SVG/editICON";
import { useState } from "react";
import ConfirmDeleteModal from "../components/modal/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImpLinkDocs } from "../types";

const ImportantDocuments = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetDataQuery({
    url: "/important_link",
  });

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

  const deletHandler = (id: string) => {
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
      url: `/important_link/${isModalOpen.id}`,
    })
      .then((res) => {
        if (res.data.success) {
          toast.dismiss();
          toast.success(`${res.data.message}`);
        }
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

  return (
    <>
      {isModalOpen.condition && (
        <ConfirmDeleteModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
      )}
      <ToastContainer />
      <div className="flex justify-center w-full p-4 bg-blue-100">
        {isLoading && <Loader />}
        <div className="w-full ">
          <div className="flex justify-between">
            <button
              onClick={() => navigate("/create-documents")}
              className="my-4 bg-[#333] text-[#f8f8f8] px-4 py-1 rounded-[7px]"
            >
              Upload Documents
            </button>
          </div>
          {data?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="">
                  <tr className="flex flex-row justify-between px-4 bg-gray-100">
                    <th className="px-4 py-2 border-b">title</th>
                    <th className="px-4 py-2 border-b ml-14">DownloadAble</th>
                    <th className="px-4 py-2 border-b">Posted At</th>
                    <th className="px-4 py-2 border-b">Action</th>
                  </tr>
                </thead>
                <tbody className="w-full">
                  {data?.map((item: ImpLinkDocs, index: number) => (
                    <tr
                      key={index}
                      className="flex flex-row items-center justify-between px-4 border-b group hover:bg-gray-50"
                    >
                      <td className="px-4 py-2 ">{item?.title}</td>
                      <td className="px-4 py-2 ">
                        {item?.donwloadable ? "yes" : "No"}
                      </td>
                      <td className="px-4 py-2 ">
                        {item?.createdAt
                          ? new Date(
                              item?.createdAt?.split("T")[0]
                            ).toLocaleDateString()
                          : ""}
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
                          onClick={() =>
                            navigate(`/update-documents/${item?._id}`)
                          }
                        >
                          <EditICONSVG
                            heignt={20}
                            width={20}
                            fill={"#5b5a5a"}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex justify-center items-center ">
              <div className="bg-white p-4 flex items-center content-end">
                No Data Found
              </div>{" "}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default ImportantDocuments;
