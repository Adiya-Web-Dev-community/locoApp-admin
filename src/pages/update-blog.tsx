import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetDataQuery, useUpdatePostMutation } from "../api";
const UpdateBlog = () => {
  const [updatePost] = useUpdatePostMutation();

  const { id } = useParams();
  const { data } = useGetDataQuery({ url: `/blog/get-blog-using-Id/${id}` });
  const [state,setState]=useState({
    title:"",
    thumnail:"",
    slug:"",
    content:""
  })
  console.log("data of single Blog>>",data)
  useEffect(()=>{
    setState({
      title:data?.data?.title,
      thumnail:data?.data?.thumnail,
      slug:data?.data?.slug,
      content:data?.data?.content
    })
  },[data]);

  const makeSlug = (value: string) => {
    return value.toLowerCase().replace(/\s+/g, "-");
  };
const handleChanges=(name:string,value:string)=>{
  if (name === "title") {
    setState({ ...state, [name]: value, slug: makeSlug(value) });
  } else {
    setState({ ...state, [name]: value });
  }
}
const HandleUpdate=useCallback(async()=>{
  try {
    const response = await updatePost({
      path: `/blog/update-blog/${id}`,
      data: state,
    });
    if (response?.data?.success) {
      toast.success(response?.data?.message, {
        autoClose: 3000,
      });

    } else {
      toast.error("Failed to Update main category");
    }
  } catch (error) {
    console.error("Update failed:", error);
  }
},[id, state, updatePost])
  return (
    <div className="p-5  w-full bg-[#e7e5e592]">
     <ToastContainer/>
      <div className="flex flex-col gap-5 border border-[#8d8787f5] p-10 rounded-[7px]">
        <div className="w-full flex flex-col gap-1">
          <label>Title</label>
          <input
          value={state?.title}
          onChange={(e)=>handleChanges("title",e.target.value)}
            type="text"
            className="border border-[#b9b4b4da] bg-[#e7e5e592] outline-none p-1 rounded-[7px]"
          />
        </div>
        <div className="w-full flex flex-col gap-1">
          <label>Thumnail</label>
          <input
          // value={state?.thumnail}
         
            type="file"
            className="border border-[#b9b4b4da] bg-[#e7e5e592] outline-none p-1 rounded-[7px]"
          />
        </div>
        <div>
          <ReactQuill
            theme="snow"
            value={state?.content}
            onChange={(content: string) => handleChanges("content",content)}
            className="h-60  rounded-[7px]"
          />
        </div>
        <div className=" w-full text-center flex justify-center ">
          <button disabled={!state?.title&&!state?.thumnail&&!state?.content} onClick={HandleUpdate} className={`${state?.title&&state?.thumnail&&state?.content?"bg-[#5a83bd]":"bg-gray-500"}  px-3 mt-8 py-1 rounded-[8px] text-[15px] font-[600] text-[#f8f8f8]`}>
            update
          </button>
        </div>
      </div>
    </div>
  );
};
export default UpdateBlog;
