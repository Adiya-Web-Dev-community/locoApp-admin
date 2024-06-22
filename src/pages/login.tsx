
const Login=()=>{
return(
    <div className="p-5  flex flex-col items-center  justify-center  content-center   w-full h-full">
    <div className="flex flex-col gap-5  bg-[#e7e5e592] p-10 rounded-[7px]">
        <h3 className=" text-[18px] font-[600] text-center">Login</h3>
      <div className="flex flex-col gap-1">
        <label className="text-[#303030] text-[15px] font-[600] px-2 py-1">
          Email
        </label>
        <input
          className="border border-[#6e6d6d5b] outline-none rounded-[7px] px-2 py-1"
          placeholder='eg:micheal123@gmail.com'
          required
          type="email"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[#303030] text-[15px] font-[600] px-2 py-1">
          Password
        </label>
        <input
          className="border border-[#6e6d6d5b] outline-none rounded-[7px] px-2 py-1"
          type="password"
          placeholder='Enter Password'
          required
        />
      </div>
     
     
      <button className="bg-[#5a83bd] p-1 rounded-[8px] text-[15px] font-[600] text-[#f8f8f8]">
        save
      </button>
    </div>
  </div>
)
}
export default Login;