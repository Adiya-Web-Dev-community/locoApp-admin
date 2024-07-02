import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { useCreatePostMutation, useGetDataQuery } from "../api";
import { BlogCategory } from "../types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  thumbnail: string;
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
    thumbnail:"data:image/jpeg;base64,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",
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
      thumnail:state?.thumbnail,
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
    <div className="p-5  w-full bg-[#e7e5e592]">
      <ToastContainer/>
      <button
        onClick={() => navigate("/blogs")}
        className="bg-[#3d3d3d] text-[#f8f8f8] px-3 py-1 rounded-[7px] text-[14px] font-[600] mb-[10px] hover:bg-[#323131]"
      >
        View blogs List
      </button>
      <div className="flex flex-col gap-5 border border-[#8d8787f5] p-10 rounded-[7px]">
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
        <div className="w-full flex flex-col gap-1">
          <label>Thumnail</label>
          <input
            // value={state?.thumbnail}
            onChange={() =>
              HandleChange(
                "thumbnail",
                "data:image/jpeg;base64,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"
              )
            }
            type="file"
            className="border border-[#b9b4b4da] bg-[#e7e5e592] outline-none p-1 rounded-[7px]"
          />
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
            !state?.thumbnail &&
            !state?.maincategory &&
            !state?.title &&
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
