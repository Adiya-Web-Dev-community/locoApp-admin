import React, { useState } from "react";

interface Props{
    value:string;
}
const Switches=({value}:Props)=>{
    const route=React.useMemo(()=>{
      switch(value){
        case "tab1":
          return <Tab1/>
          case "tab2":
          return <Tab2/>
          case "tab3":
          return <Tab3/>
          case "tab4":
          return <Tab4/>
      }
    },[value]);
    return route
  }
  export default Switches;
  
  const Tab1=()=>{
    const [edit,setEdit]=useState<boolean>(false);
    return(
  <div className="flex flex-col gap-5 bg-[#e7e5e592] p-10 rounded-[7px]">
        <h3 className=" text-[18px] font-[600] text-center">Create Main Category</h3>
          <div className="flex flex-col gap-1">
            <label className="text-[#303030] text-[15px] font-[600]">
              Main Category
            </label>
            <input
              className="border border-[#6e6d6d5b] outline-none rounded-[7px] px-2 py-1"
              type="text"
            />
          </div>
      
          <button className="bg-[#5a83bd] p-1 rounded-[8px] text-[15px] font-[600] text-[#f8f8f8]">
            save
          </button>
        </div>
    )
  }
  const Tab2=()=>{
    const [edit,setEdit]=useState<boolean>(false);
    return(
      <div className="flex flex-col gap-5 bg-[#e7e5e592] p-10 rounded-[7px]">
      <h3 className=" text-[18px] font-[600] text-center">Create Sub-Category</h3>
      <div className="flex flex-col gap-1">
      <label className="text-[#303030] text-[15px] font-[600]">
            Main Category
          </label>
      <select className="border border-[#6e6d6d5b] outline-none rounded-[7px] px-2 py-1">
        <option value="main category">Main Category</option>
      </select>
      </div>
        <div className="flex flex-col gap-1">
          <label className="text-[#303030] text-[15px] font-[600]">
            Sub-Category
          </label>
          <input
            className="border border-[#6e6d6d5b] outline-none rounded-[7px] px-2 py-1"
            type="text"
          />
        </div>
    
        <button className="bg-[#5a83bd] p-1 rounded-[8px] text-[15px] font-[600] text-[#f8f8f8]">
          save
        </button>
      </div>
    )
  }
  const Tab3=()=>{
    const [edit,setEdit]=useState<boolean>(false);
    return(
      <div className="flex flex-col gap-5 bg-[#e7e5e592] p-10 rounded-[7px]">
      <h3 className=" text-[18px] font-[600] text-center">Create Sub Sub-Category</h3>
      <div className="flex flex-col gap-1">
      <label className="text-[#303030] text-[15px] font-[600]">
            Main Category
          </label>
      <select className="border border-[#6e6d6d5b] outline-none rounded-[7px] px-2 py-1">
        <option value="main category">Main Category</option>
      </select>
      </div>
      <div className="flex flex-col gap-1">
      <label className="text-[#303030] text-[15px] font-[600]">
            Sub-Category
          </label>
      <select className="border border-[#6e6d6d5b] outline-none rounded-[7px] px-2 py-1">
        <option value="main category">Sub-Category</option>
      </select>
      </div>
        <div className="flex flex-col gap-1">
          <label className="text-[#303030] text-[15px] font-[600]">
            Sub Sub-Category
          </label>
          <input
            className="border border-[#6e6d6d5b] outline-none rounded-[7px] px-2 py-1"
            type="text"
          />
        </div>
    
        <button className="bg-[#5a83bd] p-1 rounded-[8px] text-[15px] font-[600] text-[#f8f8f8]">
          save
        </button>
      </div>
    )
  }
  const Tab4=()=>{
    const [edit,setEdit]=useState<boolean>(false);
    return(
      <div className="flex flex-col gap-5 bg-[#e7e5e592] p-10 rounded-[7px]">
        <h3 className=" text-[18px] font-[600] text-center">Create Inner Category</h3>
        <div className="flex flex-col gap-1">
        <label className="text-[#303030] text-[15px] font-[600]">
              Main Category
            </label>
        <select className="border border-[#6e6d6d5b] outline-none rounded-[7px] px-2 py-1">
          <option value="main category">Main Category</option>
        </select>
        </div>
        <div className="flex flex-col gap-1">
        <label className="text-[#303030] text-[15px] font-[600]">
              Sub-Category
            </label>
        <select className="border border-[#6e6d6d5b] outline-none rounded-[7px] px-2 py-1">
          <option value="main category">Sub-Category</option>
        </select>
        </div>
        <div className="flex flex-col gap-1">
        <label className="text-[#303030] text-[15px] font-[600]">
        Sub Sub-Category
            </label>
        <select className="border border-[#6e6d6d5b] outline-none rounded-[7px] px-2 py-1">
          <option value="main category">Sub Sub-Category</option>
        </select>
        </div>
          <div className="flex flex-col gap-1">
            <label className="text-[#303030] text-[15px] font-[600]">
              Inner Category
            </label>
            <input
              className="border border-[#6e6d6d5b] outline-none rounded-[7px] px-2 py-1"
              type="text"
            />
          </div>
      
          <button className="bg-[#5a83bd] p-1 rounded-[8px] text-[15px] font-[600] text-[#f8f8f8]">
            save
          </button>
        </div>
    )
  }