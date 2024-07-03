import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { useCreatePostMutation, useGetDataQuery } from "../api";
import { BlogCategory } from "../types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uploadImage from "../firebase_image/image";
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

const Category = () => {
  const [createPost] = useCreatePostMutation();

  const { data } = useGetDataQuery({ url: "/get-blog-category" });
 
  const [category, setCategory] = useState<popostate>({
    maincategoryData: [],
    subcategoryData: [],
    subsubcategoryData: [],
    innercategoryData: [],
  });
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
    thumnail:"",
    content: "",
  });
  const makeSlug = (value: string) => {
    return value.toLowerCase().replace(/\s+/g, "-");
  };
  console.log("data in Blog>>>", state);
  const HandleChange = (name: string, value: string) => {
    if (name === "title")
      setState((prev) => ({
        ...prev,
        slug: makeSlug(value),
      }));
    if (name === "maincategory") {
      const mainCategory = data?.data?.find(
        (cat: BlogCategory) => cat._id === value
      );
      setCategory((prev) => ({
        ...prev,
        subcategoryData: mainCategory ? mainCategory?.subCategories : [],
        subsubcategoryData: [],
        innercategoryData: [],
      }));
      setState((prev) => ({
        ...prev,
        maincategory: mainCategory ? mainCategory.name : "",
        mainId: value,
        subid: "",
        subsubid: "",
        innerid: "",
        subcategory: "",
        subsubcategory: "",
        innercategory: "",
      }));
    } else if (name === "subcategory") {
      const subCategory = category.subcategoryData.find(
        (cat: Props) => cat._id === value
      );
      setCategory((prev) => ({
        ...prev,
        subsubcategoryData: subCategory ? subCategory?.subSubCategories : [],
        innercategoryData: [],
      }));
      setState((prev) => ({
        ...prev,
        subcategory: subCategory ? subCategory.name : "",

        subid: value,
        subsubid: "",
        innerid: "",
        subsubcategory: "",
        innercategory: "",
      }));
    } else if (name === "subsubcategory") {
      const subSubCategory = category?.subsubcategoryData?.find(
        (cat: Props) => cat._id === value
      );
      setCategory((prev) => ({
        ...prev,
        innercategoryData: subSubCategory
          ? subSubCategory?.innerCategories
          : [],
      }));
      setState((prev) => ({
        ...prev,
        subsubcategory: subSubCategory ? subSubCategory.name : "",

        subsubid: value,
        innerid: "",
        innercategory: "",
      }));
    } else if (name === "innercategory") {
      const innerCategory = category?.innercategoryData?.find(
        (cat: Props) => cat._id === value
      );
      setState((prev) => ({
        ...prev,
        innercategory: innerCategory ? innerCategory.name : "",
        innerid: value,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
        setState({ ...state, thumnail: imageUrl });
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Error uploading image');
      }
  }
  };
  const navigate = useNavigate();
const HandleCreate=async()=>{
  try {
    const payload={
      maincategory: state?.maincategory,
      subcategory: state?.subcategory,
      subsubcategory: state?.subsubcategory,
      innercategory: state?.innercategory,
      title: state?.title,
      slug: state?.slug,
      thumnail:state?.thumnail,
      content: state?.content,
    }
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
}

  return (
    <div className="p-5  w-full bg-blue-100">
      <ToastContainer/>
      <button
        onClick={() => navigate("/blogs")}
        className="bg-[#3d3d3d] text-[#f8f8f8] px-3 py-1 rounded-[7px] text-[14px] font-[600] mb-[10px] hover:bg-[#323131]"
      >
        View blogs List
      </button>
      <div className="flex flex-col gap-5 border bg-white border-[#8d8787f5] p-10 rounded-[7px]">
        <select
          className="p-1 rounded-[7px] outline-none border bg-[#e7e5e592] border-[#b9b4b4da]"
          value={state?.mainId}
          onChange={(e) => HandleChange("maincategory", e.target.value)}
        >
          <option value="">Select</option>
          {data?.data?.map((category: BlogCategory, index: number) => (
            <option key={index} value={category?._id}>
              {category?.name}
            </option>
          ))}
        </select>
        {category?.subcategoryData?.length > 0 && (
          <select
            className="p-1 rounded-[7px] outline-none border bg-[#e7e5e592] border-[#b9b4b4da]"
            value={state?.subid}
            onChange={(e) => HandleChange("subcategory", e.target.value)}
          >
            <option value="">Select</option>
            {category?.subcategoryData?.map((category, index: number) => (
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))}
          </select>
        )}
        {category?.subsubcategoryData?.length > 0 && (
          <select
            className="p-1 rounded-[7px] outline-none border bg-[#e7e5e592] border-[#b9b4b4da]"
            value={state?.subsubid}
            onChange={(e) => HandleChange("subsubcategory", e.target.value)}
          >
            <option value="">Select</option>
            {category?.subsubcategoryData?.map((category, index: number) => (
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))}
          </select>
        )}
        {category?.innercategoryData?.length > 0 && (
          <select
            className="p-1 rounded-[7px] outline-none border bg-[#e7e5e592] border-[#b9b4b4da]"
            value={state?.innerid}
            onChange={(e) => HandleChange("innercategory", e.target.value)}
          >
            <option value="">Select</option>
            {category?.innercategoryData?.map((category, index: number) => (
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))}
          </select>
        )}
        <div className="w-full flex flex-col gap-1">
          <label>Title</label>
          <input
            value={state?.title}
            onChange={(e) => HandleChange("title", e.target.value)}
            type="text"
            className="border border-[#b9b4b4da] bg-[#e7e5e592] outline-none p-1 rounded-[7px]"
          />
        </div>
        <div className=" flex flex-row gap-5 relative outline-none mb-6">
          <div className="w-full ">
            <label className="block text-gray-700 font-semibold mb-2">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border-[#b9b4b4da] bg-[#e7e5e592] p-3 border outline-none  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                {
                  state?.thumnail&&<img src={state?.thumnail} alt={state?.title} className="rounded-[5px] max-w-[300px] max-h-[200px]"/>
                }
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
            !state?.thumbnail ||
            !state?.maincategory ||
            !state?.title ||
            !state?.content
          }
          className={`${
            state?.thumbnail &&
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
export default Category;
