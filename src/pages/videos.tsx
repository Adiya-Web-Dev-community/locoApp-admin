import { useNavigate } from "react-router-dom";
import DeleteICONSVG from "../assets/SVG/deleteICON";
import EditICONSVG from "../assets/SVG/editICON";
import { useGetDataQuery } from "../api";
import { videosTypes } from "../types";
import Loader from "../components/loader";

const Video = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetDataQuery({ url: "/video/get-all-video" });
  return (
    <div className="flex bg-blue-100 justify-center p-4 w-full">
      {isLoading&&<Loader/>}
      <div className="w-full ">
        <button
          onClick={() => navigate("/upload-video")}
          className="my-4 bg-[#333] text-[#f8f8f8] px-4 py-1 rounded-[7px]"
        >
          Upload Video
        </button>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="">
              <tr className="bg-gray-100 flex flex-row justify-between px-4">
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">category</th>
                <th className="py-2 px-4 border-b">Posted At</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {data?.map((item: videosTypes, index: number) => (
                <tr
                  key={index}
                  className="group hover:bg-gray-50 flex flex-row justify-between   border-b px-4"
                >
                  <td className="py-2 px-4 ">{item?.title}</td>
                  <td className="py-2 px-4 ">{item?.category}</td>
                  <td className="py-2 px-4 ">
                    {item?.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : ""}
                  </td>
                  <td className="py-2 px-4  flex gap-5 space-x-2">
                    <button className="">
                      <DeleteICONSVG heignt={20} width={20} fill={"#fe2828"} />
                    </button>
                    <button
                      onClick={() => navigate(`/video/${item?._id}`)}
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
  );
};
export default Video;
