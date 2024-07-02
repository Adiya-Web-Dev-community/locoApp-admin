import { useState } from "react";
import { useCreatePostMutation } from "../api/index";
import { useNavigate } from "react-router-dom";

interface LoginData {
  email: string;
  password: string;
  role: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [createPost] = useCreatePostMutation();
  const [logindata, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
    role: "admin",
  });

  const handleChange = (name: string, value: string) => {
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const HandleClik = async () => {
    const data = await createPost({
      data: logindata,
      path: "login",
    });
    console.log("afterlogin data>>", data);
    if (data?.data?.success) {
      localStorage.setItem("user", data?.data?.token);

      // Delay navigation by 2 seconds (2000 milliseconds)
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <div className="p-5 flex flex-col items-center justify-center content-center w-full h-full">
      <div className="flex flex-col gap-5 bg-[#e7e5e592] p-10 rounded-[7px]">
        <h3 className="text-[18px] font-[600] text-center">Login</h3>
        <div className="flex flex-col gap-1">
          <label className="text-[#303030] text-[15px] font-[600] px-2 py-1">
            Email
          </label>
          <input
            name="email"
            value={logindata?.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("email", e.target.value)
            }
            className="border border-[#6e6d6d5b] outline-none rounded-[7px] px-2 py-1"
            placeholder="eg:micheal123@gmail.com"
            required
            type="email"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[#303030] text-[15px] font-[600] px-2 py-1">
            Password
          </label>
          <input
            name="password"
            value={logindata?.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("password", e.target.value)
            }
            className="border border-[#6e6d6d5b] outline-none rounded-[7px] px-2 py-1"
            type="password"
            placeholder="Enter Password"
            required
          />
        </div>
        <button
          disabled={!logindata?.email || !logindata?.password}
          onClick={HandleClik}
          className={`${
            logindata?.email && logindata?.password ? "bg-[#5a83bd]" : "bg-gray-400"
          } p-1 rounded-[8px] text-[15px] font-[600] text-[#f8f8f8]`}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Login;
