import { useLocation, useNavigate } from "react-router-dom";
import BlogICONSVG from "../assets/SVG/blogICON";
import CategoryICONSVG from "../assets/SVG/categoryICON";
import VideoICONSVG from "../assets/SVG/videoICON";
const Sidebar = () => {
  const router = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  return (
    <div className="w-64 h-screen bg-white shadow-md p-5 flex flex-col">
      <div className="menu-item flex items-center p-2 mb-2  text-blue-900  cursor-pointer border-b-2 text-[20px] font-[600]">
        Loco App Admin
      </div>

      {sidebarData?.map((item, index: number) => {
        return (
          <div
            key={index}
            onClick={() => router(item.path)}
            className={` ${
              item?.path === pathName
                ? "bg-blue-900 text-white active"
                : "text-black hover:bg-gray-100"
            } menu-item flex items-center p-2 mb-2 rounded-md   cursor-pointer`}
          >
            <span className="icon mr-2">{item?.icon}</span>
            <span className="text ">{item?.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
interface SidebarItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const sidebarData: SidebarItem[] = [
  {
    name: "Blogs",
    path: "/blog",
    icon: <BlogICONSVG width={20} heignt={20} fill={"#9ca3af"} />,
  },
  {
    name: "Blog Category",
    path: "/blogcategory",
    icon: <CategoryICONSVG width={20} heignt={20} fill={"#9ca3af"} />,
  },

  {
    name: "Video",
    path: "/video",
    icon: <VideoICONSVG width={20} heignt={20} fill={"#9ca3af"} />,
  },
  {
    name: "Video Category",
    path: "/videocategory",
    icon: <CategoryICONSVG width={20} heignt={20} fill={"#9ca3af"} />,
  },
  {
    name: "Operations",
    path: "/operations",
    icon: "",
  },
  {
    name: "Phase Full Message",
    path: "/phse-message",
    icon: "",
  },
  {
    name: "Image & Location",
    path: "/image-location",
    icon: "",
  },
  {
    name: "Loco Failiure Cases",
    path: "/loco-failure",
    icon: "",
  },
  {
    name: "Railway History",
    path: "/history",
    icon: "",
  },
  {
    name: "MCB & Switches",
    path: "/mcb-switches",
    icon: "",
  },
  {
    name: "E-Store",
    path: "/store",
    icon: "",
  },
  {
    name: "Finance",
    path: "/finance",
    icon: "",
  },
];
