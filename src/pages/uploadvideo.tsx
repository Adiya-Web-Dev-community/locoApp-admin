import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { useCreatePostMutation, useGetDataQuery } from "../api";
import { VideoCategorys } from "../types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UploadVideo = () => {
  const [createPost] = useCreatePostMutation();
  const { data } = useGetDataQuery({ url: "/video/get-category" });
  const [state, setState] = useState({
    title: "",
    slug: "",
    category: "",
    url: "https://youtu.be/B-L4GMFPQkY",
    tags: "",
    dectription: "",
  });
  const navigate = useNavigate();
  const makeSlug = (value: string) => {
    return value.toLowerCase().replace(/\s+/g, "-");
  };
  const HandleChange = (name: string, value: string) => {
    if (name === "title") {
      setState((prev) => ({ ...prev, [name]: value, slug: makeSlug(value) }));
    } else {
      setState((prev) => ({ ...prev, [name]: value, slug: makeSlug(value) }));
    }
  };

  const [external, setExternal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setState((prev) => ({ ...prev, url: url }));
    }
  };
  const HanldeCreate = async () => {
    try {
      const response = await createPost({
        data: state,
        path: `/video/upload`,
      });

      if (response?.data?.success) {
        toast.success(response?.data?.message, {
          autoClose: 3000,
        });
        setState({
          title: "",
          slug: "",
          category: "",
          url: "",
          tags: "",
          dectription: "",
        });
      } else {
        toast.error("Failed to create Sub category");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };
  return (
    <div className="p-5  w-full bg-[#e7e5e592]">
      <ToastContainer />
      <button
        onClick={() => navigate("/video")}
        className="bg-[#3d3d3d] text-[#f8f8f8] px-3 py-1 rounded-[7px] text-[14px] font-[600] mb-[10px] hover:bg-[#323131]"
      >
        {"< go back"}
      </button>
      <div className="flex flex-col gap-5 border border-[#8d8787f5] p-10 rounded-[7px]">
        <div className="flex gap-10">
          <div className="flex gap-5 w-full">
            <label> Title: </label>
            <input
              value={state?.title}
              onChange={(e) => HandleChange("title", e.target.value)}
              type="text"
              className="w-full p-1 rounded-[7px] outline-none border bg-[#e7e5e592] border-[#b9b4b4da]"
            />
          </div>
          <div className="flex gap-5 w-full">
            <label htmlFor="">category:</label>
            <select
              value={state?.category}
              onChange={(e) => HandleChange("category", e.target.value)}
              className="w-full p-1 rounded-[7px] outline-none border bg-[#e7e5e592] border-[#b9b4b4da]"
            >
              <option value={""}>Select</option>
              {data?.map((item: VideoCategorys, index: number) => {
                return <option key={index}>{item?.category}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="flex gap-5 w-full">
          <label htmlFor="">External URL:</label>
          <input
            checked={external}
            onClick={() => setExternal(!external)}
            className="  rounded-[7px] outline-none border bg-[#e7e5e592] border-[#b9b4b4da]"
            type="checkbox"
          />
        </div>
        <div className="flex gap-5 w-full">
          {external ? (
            <>
              <label htmlFor="">URL:</label>
              <input
                value={state?.url}
                onChange={(e) => HandleChange("url", e.target.value)}
                className="w-full h-[30px] p-1 rounded-[7px] outline-none border bg-[#e7e5e592] border-[#b9b4b4da]"
                type="text"
              />
            </>
          ) : (
            <>
              <label>Upload Video:</label>
              <input
                ref={fileInputRef}
                accept="video/*"
                onChange={handleFileUpload}
                className="w-full h-[40px] p-1 rounded-[7px] outline-none border bg-[#e7e5e592] border-[#b9b4b4da]"
                type="file"
              />
            </>
          )}
          <ReactPlayer url={state?.url} width="600px" height="200px" controls />
        </div>

        <div className="flex gap-5 w-full">
          <label>Description:</label>
          <ReactQuill
            theme="snow"
            value={state?.dectription}
            onChange={(content: string) => HandleChange("dectription", content)}
            className="h-60  rounded-[7px] w-full"
          />
        </div>
        <button
          disabled={!state?.title && !state?.category && !state?.url}
          onClick={HanldeCreate}
          className={`${
            state?.title && state?.category && state?.url
              ? "bg-[#5a83bd]"
              : "bg-blue-300"
          } text-center  mt-8 p-1 rounded-[8px] text-[15px] font-[600] text-[#f8f8f8]`}
        >
          save
        </button>
      </div>
    </div>
  );
};
export default UploadVideo;
