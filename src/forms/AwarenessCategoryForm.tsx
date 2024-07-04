import React, { useState } from "react";
import { useCreatePostMutation, useGetDataQuery } from "../api";
import uploadImage from "../firebase_image/image";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";

interface Props {
  _id: string;
  name: string;
}
interface StateProps {
  mainId: string;
  subid: string;
  subsubid: string;
  innerid: string;
  maincategory: string;
  subcategory: string;
  subsubcategory: string;
  innercategory: string;
  title: string;
  slug: string;
  thumnail: string;
  content: string;
}
interface popostate {
  maincategoryData: Props[];
  subcategoryData: Props[];
  subsubcategoryData: Props[];
  innercategoryData: Props[];
}

const AwarenessCategoryForm = () => {
  const [createPost] = useCreatePostMutation();

  const { data, isLoading, error } = useGetDataQuery({
    url: "/awareness/category",
  });
  console.log(data, error, "category Awar");

  const [state, setState] = useState<StateProps>({
    maincategory: "",
    mainId: "",
    subid: "",
    subsubid: "",
    innerid: "",
    subcategory: "",
    subsubcategory: "",
    innercategory: "",
    title: "",
    slug: "",
    thumnail: "",
    content: "",
  });
  //   const makeSlug = (value: string) => {
  //     return value.toLowerCase().replace(/\s+/g, "-");
  //   };
  console.log("data in Blog>>>", state);
  const HandleChange = (name: string, value: string) => {
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [progressStatus, setProgressStatus] = useState<number | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target?.files?.[0];
    if (selectedFile) {
      try {
        const imageUrl = await uploadImage(
          selectedFile.name,
          selectedFile,
          setProgressStatus
        );
        setState({ ...state, thumnail: imageUrl });
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image");
      }
    }
  };
  const navigate = useNavigate();
  const HandleCreate = async () => {
    try {
      const payload = {
        maincategory: state?.maincategory,
        subcategory: state?.subcategory,
        subsubcategory: state?.subsubcategory,
        innercategory: state?.innercategory,
        title: state?.title,
        slug: state?.slug,
        thumnail: state?.thumnail,
        content: state?.content,
      };
      const response = await createPost({
        data: payload,
        path: "/blog/create-blogs",
      });

      if (response?.data?.success) {
        toast.success(response?.data?.message, {
          autoClose: 5000,
        });
      } else {
        toast.error("Failed to create main category");
      }
    } catch (error) {
      console.error("Error creating main category:", error);
      toast.error("An error occurred");
    }
  };

  return (
    <div className="w-full p-5 bg-blue-100">
      <ToastContainer />
      <button
        onClick={() => navigate("/blogs")}
        className="bg-[#3d3d3d] text-[#f8f8f8] px-3 py-1 rounded-[7px] text-[14px] font-[600] mb-[10px] hover:bg-[#323131]"
      >
        View Awareness List
      </button>
      <div className="flex flex-col gap-5 border bg-white border-[#8d8787f5] p-10 rounded-[7px]">
        <div className="flex flex-col w-full gap-1">
          <label>Title</label>
          <input
            value={state?.title}
            onChange={(e) => HandleChange("title", e.target.value)}
            type="text"
            className="border border-[#b9b4b4da] bg-[#e7e5e592] outline-none p-1 rounded-[7px]"
          />
        </div>
        <div className="relative flex flex-row gap-5 mb-6 outline-none ">
          <div className="w-full ">
            <label className="block mb-2 font-semibold text-gray-700">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border-[#b9b4b4da] bg-[#e7e5e592] p-3 border outline-none  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {progressStatus !== null && progressStatus !== 0 && (
              <>
                <div className="inset-0 z-10 flex flex-row items-end gap-2 pt-2">
                  <p className="text-black text-[12px]">uploading</p>
                  <div
                    className="h-1 bg-blue-400 rounded-md mx-[1px] mb-[1px]"
                    style={{ width: `${progressStatus}%` }}
                  ></div>
                </div>
              </>
            )}
          </div>
          {state?.thumnail && (
            <img
              src={state?.thumnail}
              alt={state?.title}
              className="rounded-[5px] max-w-[300px] max-h-[200px]"
            />
          )}
        </div>
        <div>
          <ReactQuill
            theme="snow"
            value={state?.content}
            onChange={(content: string) => HandleChange("content", content)}
            className="h-60  rounded-[7px]"
          />
        </div>
        <button
          onClick={HandleCreate}
          disabled={
            !state?.thumnail ||
            !state?.maincategory ||
            !state?.title ||
            !state?.content
          }
          className={`${
            state?.thumnail &&
            state?.maincategory &&
            state?.title &&
            state?.content
              ? "bg-[#5a83bd]"
              : "bg-gray-500"
          } text-center  mt-8 p-1 rounded-[8px] text-[15px] font-[600] text-[#f8f8f8]`}
        >
          save
        </button>
      </div>
    </div>
  );
};

export default AwarenessCategoryForm;
