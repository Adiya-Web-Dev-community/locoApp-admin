import { useLocation } from "react-router-dom";
const Sidebar = () => {
  const location = useLocation();
  const pathName = location.pathname;
  return (
    <div className="h-screen bg-gray-900 text-gray-400 w-60 flex flex-col">
      <div className="flex items-center justify-center h-20 border-b border-gray-800">
        <span className="text-white text-lg font-bold">AdminJS</span>
      </div>
      <nav className="mt-5">
        {sidebarData?.map((item, index: number) => {
          return (
            <>
              <a
                key={index}
                href={item?.path}
                className={`flex items-center p-1.5 mt-2 text-white ${
                  item?.path === pathName ? "bg-gray-700" : "hover:bg-gray-700"
                }  rounded-md`}
              >
                <span className="ml-4">{item?.name}</span>
              </a>
            </>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
interface SidebarItem {
  name: string;
  path: string;
}

const sidebarData: SidebarItem[] = [
  {
    name: "Category",
    path: "/category",
  },
  { name: "Create Blog Category", path: "/create-blogcategory" },
  {
    name: "TDS Category",
    path: "/tds-category",
  },
  {
    name: "Traffic",
    path: "/traffic",
  },
  {
    name: "Operations",
    path: "/operations",
  },
  {
    name: "Phase Full Message",
    path: "/phse-message",
  },
  {
    name: "Image & Location",
    path: "/image-location",
  },
  {
    name: "Loco Failiure Cases",
    path: "/loco-failure",
  },
  {
    name: "Railway History",
    path: "/history",
  },
  {
    name: "MCB & Switches",
    path: "/mcb-switches",
  },
  {
    name: "E-Store",
    path: "/store",
  },
  {
    name: "Finance",
    path: "/finance",
  },
];
