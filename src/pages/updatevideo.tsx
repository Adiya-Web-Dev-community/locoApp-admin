import { MouseEventHandler, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import ReactPlayer from 'react-player';
const UpdateVideo = () => {
  const [value, setvalue] = useState<string>();
  const navigate = useNavigate();
  const makeSlug = (value: string) => {
    return value.toLowerCase().replace(/\s+/g, "-");
  };
const [external,setExternal]=useState(false);
const [videoUrl, setVideoUrl] = useState<string>("https://youtu.be/B-L4GMFPQkY");
const fileInputRef = useRef<HTMLInputElement>(null);
const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log("Url of file>>", event);
  const file = event.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);

    setVideoUrl(url);
  }
};
  return (
    <div className="p-5  w-full bg-[#e7e5e592]">
      <button
        onClick={() => navigate("/video")}
        className="bg-[#3d3d3d] text-[#f8f8f8] px-3 py-1 rounded-[7px] text-[14px] font-[600] mb-[10px] hover:bg-[#323131]"
      >
        {"< go back"}
      </button>
      <div className="flex flex-col gap-5 border border-[#8d8787f5] p-10 rounded-[7px]">
        <div className="flex gap-10">
        <div className="flex gap-5 w-full">
            <label> Title: </label>
        <input type="text" className="w-full p-1 rounded-[7px] outline-none border bg-[#e7e5e592] border-[#b9b4b4da]"/>
        </div>
        <div className="flex gap-5 w-full">
            <label htmlFor="">category:</label>
        <select className="w-full p-1 rounded-[7px] outline-none border bg-[#e7e5e592] border-[#b9b4b4da]">
          <option>Select</option>
        </select>
        </div>
        </div>
        <div className="flex gap-5 w-full">
        <label htmlFor="">External URL:</label>
        <input  checked={external} onClick={()=>setExternal(!external)} className="  rounded-[7px] outline-none border bg-[#e7e5e592] border-[#b9b4b4da]" type="checkbox"/>
        </div>
        <div className="flex gap-5 w-full">
        {external?<>
        <label htmlFor="">URL:</label>
        <input      className="w-full h-[30px] p-1 rounded-[7px] outline-none border bg-[#e7e5e592] border-[#b9b4b4da]" type="text"/>
     
        </>:<>
        <label >Upload Video:</label>
        <input    ref={fileInputRef} accept="video/*" onClick={handleFileUpload} className="w-full h-[40px] p-1 rounded-[7px] outline-none border bg-[#e7e5e592] border-[#b9b4b4da]" type="file"/>
        </>
       
        }
          <ReactPlayer 
        url={videoUrl} 
        width="600px" 
        height="200px" 
        controls 
      />
       </div>
       
       
        
        <div className="flex gap-5 w-full">
            <label>Description:</label>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={(content: string) => setvalue(content)}
            className="h-60  rounded-[7px] w-full"
          />
        </div>
        <button className="text-center bg-[#5a83bd] mt-8 p-1 rounded-[8px] text-[15px] font-[600] text-[#f8f8f8]">
          update
        </button>
      </div>
    </div>
  );
};
export default UpdateVideo;
