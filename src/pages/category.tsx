import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const Category=()=>{
  const [value,setvalue]=useState<string>();
    return(
      <div className="p-5  w-full bg-[#e7e5e592]">
      <div className="flex flex-col gap-5 border border-[#8d8787f5] p-10 rounded-[7px]">
      <select className="p-1 rounded-[7px] outline-none border bg-[#e7e5e592] border-[#b9b4b4da]">
        <option>Select</option>
      </select>
      <select className="p-1 rounded-[7px] outline-none border bg-[#e7e5e592] border-[#b9b4b4da]">
        <option>Select</option>
      </select>
      <select className="p-1 rounded-[7px] outline-none border bg-[#e7e5e592] border-[#b9b4b4da]">
        <option>Select</option>
      </select>
      <select className="p-1 rounded-[7px] outline-none border bg-[#e7e5e592] border-[#b9b4b4da]">
        <option>Select</option>
      </select>
      <div>
      <ReactQuill
            theme="snow"
            value={value}
            onChange={(content: string) => setvalue(content)}
            className="h-60  rounded-[7px]"
          />
          </div>
        <button className="text-center bg-[#5a83bd] mt-8 p-1 rounded-[8px] text-[15px] font-[600] text-[#f8f8f8]">
          save
        </button>
      </div>
    </div>
    )
}
export default Category;