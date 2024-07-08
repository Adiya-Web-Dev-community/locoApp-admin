
import BlogICONSVG from "../../assets/SVG/blogICON";
import CategoryICONSVG from "../../assets/SVG/categoryICON";
import VideoICONSVG from "../../assets/SVG/videoICON";
import AwareNessSVG from "../../assets/SVG/arenessICON";
import SponorSVG from "../../assets/SVG/sponsor.ICON";
import DocumentSVG from "../../assets/SVG/documentICON";
import UserSVG from "../../assets/SVG/userICON";

export interface SidebarItem {
    name: string;
    path: string;
    icon: React.ReactNode;
  }
  
export const sidebarData: SidebarItem[] = [
    {
      name: "Blogs",
      path: "/blog",
      icon: <BlogICONSVG width={20} heignt={20} fill={"#9ca3af"} />,
    }
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
      name: "Awareness",
      path: "/awareness",
      icon: <AwareNessSVG width={20} heignt={20} fill={"#9ca3af"} />,
    },
    {
      name: "Awareness Category",
      path: "/awareness-category",
      icon: <AwareNessSVG width={20} heignt={20} fill={"#9ca3af"} />,
    },
    {
      name: "Sponsor",
      path: "/sponsor",
      icon: <SponorSVG width={20} heignt={20} fill={"#9ca3af"} />,
    },
    {
      name: "Important Document",
      path: "/important-document",
      icon: <DocumentSVG width={20} heignt={20} fill={"#9ca3af"} />,
    },
    {
      name: "Users",
      path: "/users",
      icon: <UserSVG width={20} heignt={20} fill={"#9ca3af"} />,
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