import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
interface Props {
  children?: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") navigate("/blog");
  }, [navigate]);

  return (
    <div className="flex flex-row ">
      <ToastContainer />
      <Sidebar />
      <div className="h-screen overflow-auto ">{children}</div>
      <Outlet />
    </div>
  );
};
export default Layout;
