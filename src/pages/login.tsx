import { ChangeEvent, useState } from "react";
import { UseCreatePostMutationType, useCreatePostMutation } from "../api/index";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEye, FiEyeOff, FiLock, FiUser } from "react-icons/fi";
import loginImg from "../assets/login_3.svg";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setUserToken } from "../store/auth";

interface LoginData {
  email: string;
  password: string;
  role: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [createPost] = useCreatePostMutation() as UseCreatePostMutationType;
  const [logindata, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
    role: "admin",
  });
  const [isVisible, setVisible] = useState(false);
  const [isLoading, setLoader] = useState<boolean>(false);

  const dispatch = useDispatch();
  // const handleChange = (name: string, value: string) => {
  //   setLoginData((prev) => ({ ...prev, [name]: value }));
  // };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const HandleClik = async () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoader(true);
    createPost({
      data: logindata,
      path: "/login",
    })
      .then((res) => {
        console.log(res);
        if (res?.data?.success) {
          localStorage.setItem("user", res?.data?.token);
          dispatch(setUserToken(res?.data?.token));
          toast.success("You have been Logged in", {
            autoClose: 3000,
          });
          setTimeout(() => {
            setLoader(false);
            // window.location.reload();
            navigate("/");
          }, 2000);
        } else {
          setLoader(false);
          toast.error("Some eror occure check your cridential");
        }
      })
      .catch((err: any) => {
        toast.error(`Data is wrong`);
        console.log(err);
      });
    // console.log("afterlogin data>>", data);
  };
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoader(true);
  //   const data = await createPost({
  //     data: logindata,
  //     path: "/login",
  //   });
  //   console.log("afterlogin data>>", data);
  //   if (data?.data?.success) {
  //     localStorage.setItem("user", data?.data?.token);
  //     dispatch(setUserToken(data?.data?.token));
  //     toast.success("You have been Logged in", {
  //       autoClose: 3000,
  //     });
  //     setTimeout(() => {
  //       setLoader(false);
  //       // window.location.reload();
  //       navigate("/");
  //     }, 2000);
  //   } else {
  //     setLoader(false);
  //     toast.error("Some eror occure check your cridential");
  //   }
  // };

  return (
    // <div className="flex flex-col items-center content-center justify-center w-full h-full p-5">
    //   <ToastContainer/>
    //   {isLoading &&<Loader/>}
    //   <div className="flex flex-col gap-5 bg-[#e7e5e592] p-10 rounded-[7px]">
    //     <h3 className="text-[18px] font-[600] text-center">Login</h3>
    //     <div className="flex flex-col gap-1">
    //       <label className="text-[#303030] text-[15px] font-[600] px-2 py-1">
    //         Email
    //       </label>
    //       <input
    //         name="email"
    //         value={logindata?.email}
    //         onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    //           handleChange("email", e.target.value)
    //         }
    //         className="border border-[#6e6d6d5b] outline-none rounded-[7px] px-2 py-1"
    //         placeholder="eg:micheal123@gmail.com"
    //         required
    //         type="email"
    //       />
    //     </div>
    //     <div className="flex flex-col gap-1">
    //       <label className="text-[#303030] text-[15px] font-[600] px-2 py-1">
    //         Password
    //       </label>
    //       <input
    //         name="password"
    //         value={logindata?.password}
    //         onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    //           handleChange("password", e.target.value)
    //         }
    //         className="border border-[#6e6d6d5b] outline-none rounded-[7px] px-2 py-1"
    //         type="password"
    //         placeholder="Enter Password"
    //         required
    //       />
    //     </div>
    //     <button
    //       disabled={!logindata?.email || !logindata?.password}
    //       onClick={HandleClik}
    //       className={`${
    //         logindata?.email && logindata?.password ? "bg-[#5a83bd]" : "bg-gray-400"
    //       } p-1 rounded-[8px] text-[15px] font-[600] text-[#f8f8f8]`}
    //     >
    //       Save
    //     </button>
    //   </div>
    // </div>

    <>
      <div className="flex flex-col items-center justify-center h-screen px-4 mx-auto  w-[100%]  sm:w-[80%] md:w-[50%]  lg:w-[40%]">
        <div className="">
          <h4 className="text-[24px] md:text-3xl lg:text-4xl font-bold pb-2 text-gray-600">
            Log in to your Account
          </h4>
          <p className="text-sm font-medium text-gray-600 sm:text-base">
            Welcome back! Please Login to continue
          </p>
        </div>
        <form
          className="flex flex-col items-center justify-center w-full py-4 lg:p-8"
          onSubmit={handleSubmit}
        >
          <div className="relative w-full">
            <FiUser className="absolute w-5 h-5 text-gray-400 top-[10px] left-2" />
            <input
              className="w-full py-[6px] mb-4 transition-all duration-200 border-2 rounded-md outline-none bg-blue-50 placeholder:text-gray-400 pl-9 focus:border-blue-300"
              onChange={handleChange}
              value={logindata.email}
              name="email"
              type="email"
              required
              placeholder="Email"
            />
          </div>
          <div className="relative w-full mb-4 lg:mb-6">
            <FiLock className="absolute w-5 h-5 text-gray-400 top-[10px] left-2" />
            <input
              className="w-full px-8 py-[6px]  bg-blue-50 transition-all duration-200 border-2 rounded-md outline-none placeholder:text-gray-400 pl-9 focus:border-blue-300"
              onChange={handleChange}
              value={logindata.password}
              name="password"
              type={`${isVisible ? "text" : "password"}`}
              required
              placeholder="Password"
            />
            <button
              className="absolute text-gray-400 right-4 top-[10px]"
              role="button"
              onClick={(e) => {
                e.preventDefault();
                setVisible((prev) => !prev);
              }}
            >
              {isVisible ? (
                <FiEye className="w-5 h-5 text-blue-400" />
              ) : (
                <FiEyeOff className="w-5 h-5 " />
              )}
            </button>
          </div>

          <div className="grid w-full pb-2">
            <p className="flex flex-col pb-4 lg:pb-8 justify-self-end">
              <Link
                to="/login/forgot-password"
                className="text-blue-500 font-medium text-sm border-b border-transparent hover:border-blue-500 hover:text-blue-600 transition-all duration-500  w-[fit-content]"
              >
                Forgot Your Password ?
              </Link>
            </p>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-[#1F3C88] border rounded-md disabled:bg-gray-600 hover:bg-[#1f5e88]"
            >
              Login
            </button>
          </div>
          <div className="mt-2 text-sm ">
            <span className="text-gray-700">Don't have account ?</span>
            <Link
              to={"/login/register"}
              className="ml-2 text-blue-500 font-medium  border-b border-transparent   hover:text-blue-600 transition-all duration-500  w-[fit-content]"
            >
              Create a Account
            </Link>
          </div>
        </form>
      </div>
      <div className="flex-col items-center justify-center hidden h-screen rounded-md md:flex">
        <img src={loginImg} alt="login image" className="w-full h-full" />
      </div>
    </>
  );
};

export default Login;
