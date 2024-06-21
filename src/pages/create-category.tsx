const Create_Category = () => {
  return (
    <div className="p-5  flex flex-col content-center justify-center items-center w-full">
      <div className="flex flex-col gap-5 bg-[#e7e5e592] p-10 rounded-[7px]">
        <div className="flex flex-col gap-1">
          <label className="text-[#303030] text-[15px] font-[600]">
            Main Category
          </label>
          <input
            className="border border-[#6e6d6d5b] outline-none rounded-[7px] px-2 py-1"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[#303030] text-[15px] font-[600] px-2 py-1">
            Category
          </label>
          <input
            className="border border-[#6e6d6d5b] outline-none rounded-[7px] px-2 py-1"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[#303030] text-[15px] font-[600]">
            Sub Category
          </label>
          <input
            className="border border-[#6e6d6d5b] outline-none rounded-[7px] px-2 py-1"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[#303030] text-[15px] font-[600]">
            Low Category
          </label>
          <input
            className="border border-[#6e6d6d5b] outline-none rounded-[7px] px-2 py-1 "
            type="text"
          />
        </div>
        <button className="bg-[#5a83bd] p-1 rounded-[8px] text-[15px] font-[600] text-[#f8f8f8]">
          save
        </button>
      </div>
    </div>
  );
};
export default Create_Category;
