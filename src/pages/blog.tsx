import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Link, useNavigate } from "react-router-dom";
import { useCreatePostMutation, useGetDataQuery } from "../api";
import { BlogCategory } from "../types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uploadImage from "../firebase_image/image";
import TextEditor from "../components/textEditor";
import { TiArrowBackOutline } from "react-icons/ti";
import { FaBloggerB, FaCaretDown } from "react-icons/fa";

interface Props {
  _id: string;
  name: string;
}

interface StateProps {
  mainId: string;
  subid: string;
  subsubid: string;
  innerid: string;
  maincategory: string;
  subcategory: string;
  subsubcategory: string;
  innercategory: string;
  title: string;
  slug: string;
  thumnail: string;
  content: string;
  imageTitle: string;
}
interface popostate {
  maincategoryData: Props[];
  subcategoryData: Props[];
  subsubcategoryData: Props[];
  innercategoryData: Props[];
}

const Category = () => {
  const [createPost] = useCreatePostMutation();

  const { data } = useGetDataQuery({ url: "/get-blog-category" });

  const [category, setCategory] = useState<popostate>({
    maincategoryData: [],
    subcategoryData: [],
    subsubcategoryData: [],
    innercategoryData: [],
  });
  const [state, setState] = useState<StateProps>({
    maincategory: "",
    mainId: "",
    subid: "",
    subsubid: "",
    innerid: "",
    subcategory: "",
    subsubcategory: "",
    innercategory: "",
    title: "",
    slug: "",
    thumnail: "",
    content: "",
    imageTitle: "",
  });

  const [isOpen, setOpen] = useState({
    maincategory: false,
    subcategory: false,
    subsubcategory: false,
    innercategory: false,
  });

  const makeSlug = (value: string) => {
    return value.toLowerCase().replace(/\s+/g, "-");
  };
  console.log("data in Blog>>>", state, data, category);

  const handleDropChange = (name: string, value: string) => {
    console.log(name, value, "change text");
    if (name === "maincategory") {
      const mainCategory = data?.data?.find(
        (cat: BlogCategory) => cat._id === value
      );
      setCategory((prev) => ({
        ...prev,
        subcategoryData: mainCategory ? mainCategory?.subCategories : [],
        subsubcategoryData: [],
        innercategoryData: [],
      }));
      setState((prev) => ({
        ...prev,
        maincategory: mainCategory ? mainCategory.name : "",
        mainId: value,
        subid: "",
        subsubid: "",
        innerid: "",
        subcategory: "",
        subsubcategory: "",
        innercategory: "",
      }));
    } else if (name === "subcategory") {
      const subCategory = category.subcategoryData.find(
        (cat: Props) => cat._id === value
      );
      setCategory((prev) => ({
        ...prev,
        subsubcategoryData: subCategory ? subCategory?.subSubCategories : [],
        innercategoryData: [],
      }));
      setState((prev) => ({
        ...prev,
        subcategory: subCategory ? subCategory.name : "",

        subid: value,
        subsubid: "",
        innerid: "",
        subsubcategory: "",
        innercategory: "",
      }));
    } else if (name === "subsubcategory") {
      const subSubCategory = category?.subsubcategoryData?.find(
        (cat: Props) => cat._id === value
      );
      setCategory((prev) => ({
        ...prev,
        innercategoryData: subSubCategory
          ? subSubCategory?.innerCategories
          : [],
      }));
      setState((prev) => ({
        ...prev,
        subsubcategory: subSubCategory ? subSubCategory.name : "",

        subsubid: value,
        innerid: "",
        innercategory: "",
      }));
    } else if (name === "innercategory") {
      const innerCategory = category?.innercategoryData?.find(
        (cat: Props) => cat._id === value
      );
      setState((prev) => ({
        ...prev,
        innercategory: innerCategory ? innerCategory.name : "",
        innerid: value,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setOpen((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  console.log(state.content, "editor");
  const [progressStatus, setProgressStatus] = useState<number | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target?.files?.[0];
    if (selectedFile) {
      try {
        const imageUrl = await uploadImage(
          selectedFile.name,
          selectedFile,
          setProgressStatus
        );
        setState({
          ...state,
          thumnail: imageUrl,
          imageTitle: selectedFile.name,
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image");
      }
    }
  };
  const navigate = useNavigate();
  // const HandleCreate = async () => {
  //   try {
  //     const payload = {
  //       maincategory: state?.maincategory,
  //       subcategory: state?.subcategory,
  //       subsubcategory: state?.subsubcategory,
  //       innercategory: state?.innercategory,
  //       title: state?.title,
  //       slug: state?.slug,
  //       thumnail: state?.thumnail,
  //       content: state?.content,
  //     };
  //     const response = await createPost({
  //       data: payload,
  //       path: "/blog/create-blogs",
  //     });

  //     if (response?.data?.success) {
  //       toast.success(response?.data?.message, {
  //         autoClose: 5000,
  //       });
  //     } else {
  //       toast.error("Failed to create Blog");
  //     }
  //   } catch (error) {
  //     console.error("Error creating Blog:", error);
  //     toast.error("An error occurred");
  //   }
  // };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    // const companySponserPostObject = {
    //   name: companiesData.name,
    //   type: companiesData.type,
    //   image: data?.image ? data?.image : companiesData.image,
    //   link: companiesData.webLink,
    //   video: companiesData.url,
    //   description: companiesData.discription,
    //   active: companiesData.status,
    // };

    // console.log(companiesData);

    // toast.loading("Checking Details");
    // try {
    //   console.log(companySponserPostObject, "submit");
    //   const response = await updatePost({
    //     data: companySponserPostObject,
    //     method: isUpdate && !isError ? "PUT" : "POST",
    //     path:
    //       isUpdate && !isError ? `/sponsor/company/${id}` : "/sponsor/company",
    //   });
    //   console.log(response);
    //   if (response?.data?.success) {
    //     toast.dismiss();
    //     toast.success(response?.data?.message, {
    //       autoClose: 5000,
    //     });
    //     clearhandler();
    //   } else {
    //     toast.dismiss();
    //     toast.error("Failed to Add Company for Sponsor");
    //   }
    // } catch (error) {
    //   toast.dismiss();
    //   console.error("Error Add Company for Sponsor:", error);
    //   toast.error("An error occurred");
    // }

    console.log(state, "hello");
    try {
      toast.loading("Checking Details");
      const payload = {
        maincategory: state?.maincategory,
        subcategory: state?.subcategory,
        subsubcategory: state?.subsubcategory,
        innercategory: state?.innercategory,
        title: state?.title,
        slug: state?.slug,
        thumnail: state?.thumnail,
        content: state?.content,
      };
      console.log(payload, "data creating...");
      const response = await createPost({
        data: payload,
        path: "/blog/create-blogs",
      });

      console.log(response);

      if (response?.data?.success) {
        toast.dismiss();
        toast.success(response?.data?.message, {
          autoClose: 5000,
        });
        clearhandler();
      } else {
        toast.dismiss();
        toast.error("Failed to create Blog");
      }
    } catch (error) {
      toast.dismiss();
      console.error("Error creating Blog:", error);
      toast.error("An error occurred");
    }
  };

  const clearhandler = () => {
    setState({
      maincategory: "",
      mainId: "",
      subid: "",
      subsubid: "",
      innerid: "",
      subcategory: "",
      subsubcategory: "",
      innercategory: "",
      title: "",
      slug: "",
      thumnail: "",
      content: "",
      imageTitle: "",
    });

    navigate("/creat-blog/blogs-list");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;

    if (name === "title")
      setState((prev) => ({
        ...prev,
        slug: makeSlug(value),
      }));

    setState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    // <div className="w-full p-5 bg-blue-100">
    //   <ToastContainer />
    //   <button
    //     onClick={() => navigate("/creat-blog/blogs-list")}
    //     className="bg-[#3d3d3d] text-[#f8f8f8] px-3 py-1 rounded-[7px] text-[14px] font-[600] mb-[10px] hover:bg-[#323131]"
    //   >
    //     View blogs List
    //   </button>
    //   <div className="flex flex-col gap-5 border bg-white border-[#8d8787f5] p-10 rounded-[7px]">
    //     <select
    //       className="p-1 rounded-[7px] outline-none border bg-[#e7e5e592] border-[#b9b4b4da]"
    //       value={state?.mainId}
    //       onChange={(e) => HandleChange("maincategory", e.target.value)}
    //     >
    //       <option value="">Select</option>
    //       {data?.data?.map((category: BlogCategory, index: number) => (
    //         <option key={index} value={category?._id}>
    //           {category?.name}
    //         </option>
    //       ))}
    //     </select>
    //     {category?.subcategoryData?.length > 0 && (
    //       <select
    //         className="p-1 rounded-[7px] outline-none border bg-[#e7e5e592] border-[#b9b4b4da]"
    //         value={state?.subid}
    //         onChange={(e) => HandleChange("subcategory", e.target.value)}
    //       >
    //         <option value="">Select</option>
    //         {category?.subcategoryData?.map((category, index: number) => (
    //           <option key={index} value={category?._id}>
    //             {category?.name}
    //           </option>
    //         ))}
    //       </select>
    //     )}
    //     {category?.subsubcategoryData?.length > 0 && (
    //       <select
    //         className="p-1 rounded-[7px] outline-none border bg-[#e7e5e592] border-[#b9b4b4da]"
    //         value={state?.subsubid}
    //         onChange={(e) => HandleChange("subsubcategory", e.target.value)}
    //       >
    //         <option value="">Select</option>
    //         {category?.subsubcategoryData?.map((category, index: number) => (
    //           <option key={index} value={category?._id}>
    //             {category?.name}
    //           </option>
    //         ))}
    //       </select>
    //     )}
    //     {category?.innercategoryData?.length > 0 && (
    //       <select
    //         className="p-1 rounded-[7px] outline-none border bg-[#e7e5e592] border-[#b9b4b4da]"
    //         value={state?.innerid}
    //         onChange={(e) => HandleChange("innercategory", e.target.value)}
    //       >
    //         <option value="">Select</option>
    //         {category?.innercategoryData?.map((category, index: number) => (
    //           <option key={index} value={category?._id}>
    //             {category?.name}
    //           </option>
    //         ))}
    //       </select>
    //     )}
    //     <div className="flex flex-col w-full gap-1">
    //       <label>Title</label>
    //       <input
    //         value={state?.title}
    //         onChange={(e) => HandleChange("title", e.target.value)}
    //         type="text"
    //         className="border border-[#b9b4b4da] bg-[#e7e5e592] outline-none p-1 rounded-[7px]"
    //       />
    //     </div>
    //     <div className="relative flex flex-row gap-5 mb-6 outline-none ">
    //       <div className="w-full ">
    //         <label className="block mb-2 font-semibold text-gray-700">
    //           Profile Image
    //         </label>
    //         <input
    //           type="file"
    //           accept="image/*"
    //           onChange={handleImageChange}
    //           className="w-full border-[#b9b4b4da] bg-[#e7e5e592] p-3 border outline-none  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //         />
    //         {progressStatus !== null && progressStatus !== 0 && (
    //           <>
    //             <div className="inset-0 z-10 flex flex-row items-end gap-2 pt-2">
    //               <p className="text-black text-[12px]">uploading</p>
    //               <div
    //                 className="h-1 bg-blue-400 rounded-md mx-[1px] mb-[1px]"
    //                 style={{ width: `${progressStatus}%` }}
    //               ></div>
    //             </div>
    //           </>
    //         )}
    //       </div>
    //       {state?.thumnail && (
    // <img
    //   src={state?.thumnail}
    //   alt={state?.title}
    //   className="rounded-[5px] max-w-[300px] max-h-[200px]"
    // />
    //       )}
    //     </div>

    //     <TextEditor
    //       value={state?.content}
    //       OnChangeEditor={(e: string) => HandleChange("content", e)}
    //     />
    //     <button
    //       onClick={HandleCreate}
    //       disabled={
    //         !state?.thumnail ||
    //         !state?.maincategory ||
    //         !state?.title ||
    //         !state?.content
    //       }
    //       className={`${
    //         state?.thumnail &&
    //         state?.maincategory &&
    //         state?.title &&
    //         state?.content
    //           ? "bg-[#5a83bd]"
    //           : "bg-gray-500"
    //       } text-center  mt-8 p-1 rounded-[8px] text-[15px] font-[600] text-[#f8f8f8]`}
    //     >
    //       save
    //     </button>
    //   </div>
    // </div>
    <div className="w-full md:px-4 md:ml-4 md:pl-0">
      <form
        className="w-full h-[calc(100vh-6rem)] overflow-hidden   rounded-md"
        onSubmit={submitHandler}
      >
        <div className="flex-1 h-full p-6 rounded font-montserrat">
          <div className="flex pb-2">
            <h2 className="md:text-4xl text-[28px] font-bold text-gray-500 font-mavenPro">
              Blog Form
            </h2>
            {/* <div onClick={clearhandler}>
              <TiArrowBackOutline className="w-10 h-10 ml-4 text-emerald-600 hover:text-emerald-500" />
            </div> */}
          </div>
          <div className="flex items-center justify-end w-full pb-2">
            {/* <button> */}
            <Link
              to={"/creat-blog/blogs-list"}
              className="px-2 py-2 text-sm font-semibold text-white bg-blue-800 rounded-md font-mavenPro"
            >
              View Blog List
            </Link>
            {/* </button> */}
          </div>
          <div className="h-[calc(100vh-16rem)] w-full overflow-y-auto  [&::-webkit-scrollbar]:hidden font-mavenPro">
            <div className="grid items-center grid-cols-1 gap-4 py-4 md:grid-cols-2">
              {/* {state.thumnail && } */}
              <div className="w-[200px] h-[200px] bg-blue-100 text-white rounded-md col-span-1 md:col-span-2">
                {state.thumnail ? (
                  <img
                    src={state?.thumnail}
                    alt={state?.title}
                    className="rounded-[5px] max-w-[300px] max-h-[200px]"
                  />
                ) : (
                  <p className="flex items-center justify-center w-full h-full gap-4 p-4 text-sm">
                    <FaBloggerB className="w-16 h-12 text-gray-500" />
                    <span className="font-medium text-gray-500 w-fit">
                      Here Uploade Image will be shown
                    </span>
                  </p>
                )}
              </div>
              <div className="relative w-full h-full">
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className={`px-4 py-2 pl-24 relative ${
                    progressStatus ? "pb-2" : ""
                  } w-full text-base bg-blue-100 focus:border-blue-200 border-transparent border rounded-md text-gray-400 cursor-pointer flex items-center justify-between`}
                >
                  {state.imageTitle || "Choose a file"}
                  <span className="text-gray-400 text-[15px] absolute top-0 h-full flex items-center left-0 rounded-tl-md rounded-bl-md px-3 font-medium bg-blue-200">
                    Browse
                  </span>
                </label>
                {progressStatus !== null && progressStatus !== 0 && (
                  <>
                    <div className="absolute inset-0 z-10 flex items-end">
                      <div
                        className="h-1 bg-blue-400 rounded-md mx-[1px] mb-[1px]"
                        style={{ width: `${progressStatus}%` }}
                        // style={{ width: `${100}%` }}
                      ></div>
                    </div>
                  </>
                )}
              </div>
              <input
                value={state.title}
                type="text"
                onChange={handleChange}
                name="title"
                className="w-full h-10 pl-4 font-medium bg-blue-100 border border-transparent rounded-md outline-none focus:border-blue-200 "
                placeholder="Enter Blog Title"
                required
              />
              {/* <input
              value={companiesData.email}
              type="email"
              onChange={handleChange}
              name="email"
              className="w-full h-10 pl-4 font-medium border border-transparent rounded-md outline-none bg-green-50 focus:border-blue-200 "
              placeholder="Company Email"
              required
            /> */}

              {/* Main Category Dropdown */}
              <div className="relative">
                <div
                  className="flex justify-between p-2 pl-4 font-medium text-gray-400 bg-blue-100 border-transparent rounded-md cursor-pointer focus:border-blue-200"
                  onClick={() =>
                    setOpen({ ...isOpen, maincategory: !isOpen.maincategory })
                  }
                >
                  {state.maincategory !== ""
                    ? state.maincategory
                    : "Select Main Category"}
                  <FaCaretDown className="m-1" />
                </div>
                <ul
                  className={`mt-2 p-2 rounded-md w-32 text-[#DEE1E2] bg-gray-800 shadow-lg absolute z-10 ${
                    isOpen.maincategory ? "max-h-60" : "hidden"
                  } custom-scrollbar`}
                >
                  {data?.data?.map((main, i) => (
                    <li
                      key={i}
                      className={`p-2 mb-2 text-sm text-[#DEE1E2]  rounded-md cursor-pointer hover:bg-blue-200/60 ${
                        state.maincategory === main?.name ? "bg-rose-600" : ""
                      }`}
                      onClick={() =>
                        handleDropChange("maincategory", main?._id)
                      }
                    >
                      <span>{main?.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sub Category Dropdown */}
              {category.subcategoryData.length > 0 && (
                <div className="relative">
                  <div
                    className="flex justify-between p-2 pl-4 font-medium text-gray-400 bg-blue-100 border-transparent rounded-md cursor-pointer focus:border-blue-200"
                    onClick={() =>
                      setOpen({ ...isOpen, subcategory: !isOpen.subcategory })
                    }
                  >
                    {state.subcategory !== ""
                      ? state.subcategory
                      : "Select Sub Category"}
                    <FaCaretDown className="m-1" />
                  </div>
                  <ul
                    className={`mt-2 p-2 rounded-md w-32 text-[#DEE1E2] bg-gray-800 shadow-lg absolute z-10 ${
                      isOpen.subcategory ? "max-h-60" : "hidden"
                    } custom-scrollbar`}
                  >
                    {category.subcategoryData?.map((sub, i) => (
                      <li
                        key={i}
                        className={`p-2 mb-2 text-sm text-[#DEE1E2]  rounded-md cursor-pointer hover:bg-blue-200/60 ${
                          state.subcategory === sub?.name ? "bg-rose-600" : ""
                        }`}
                        onClick={() =>
                          handleDropChange("subcategory", sub?._id)
                        }
                      >
                        <span>{sub?.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* SubSub Category Dropdown */}
              {category.subsubcategoryData.length > 0 && (
                <div className="relative">
                  <div
                    className="flex justify-between p-2 pl-4 font-medium text-gray-400 bg-blue-100 border-transparent rounded-md cursor-pointer focus:border-blue-200"
                    onClick={() =>
                      setOpen({
                        ...isOpen,
                        subsubcategory: !isOpen.subsubcategory,
                      })
                    }
                  >
                    {state.subsubcategory !== ""
                      ? state.subsubcategory
                      : "Select Sub-Sub Category"}
                    <FaCaretDown className="m-1" />
                  </div>
                  <ul
                    className={`mt-2 p-2 rounded-md w-32 text-[#DEE1E2] bg-gray-800 shadow-lg absolute z-10 ${
                      isOpen.subsubcategory ? "max-h-60" : "hidden"
                    } custom-scrollbar`}
                  >
                    {category.subsubcategoryData?.map((subsub, i) => (
                      <li
                        key={i}
                        className={`p-2 mb-2 text-sm text-[#DEE1E2]  rounded-md cursor-pointer hover:bg-blue-200/60 ${
                          state.subsubcategory === subsub?.name
                            ? "bg-rose-600"
                            : ""
                        }`}
                        onClick={() =>
                          handleDropChange("subsubcategory", subsub?._id)
                        }
                      >
                        <span>{subsub?.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* inner Category Dropdown */}
              {category.innercategoryData.length > 0 && (
                <div className="relative">
                  <div
                    className="flex justify-between p-2 pl-4 font-medium text-gray-400 bg-blue-100 border-transparent rounded-md cursor-pointer focus:border-blue-200"
                    onClick={() =>
                      setOpen({
                        ...isOpen,
                        innercategory: !isOpen.innercategory,
                      })
                    }
                  >
                    {state.innercategory !== ""
                      ? state.innercategory
                      : "Select Inner Category"}
                    <FaCaretDown className="m-1" />
                  </div>
                  <ul
                    className={`mt-2 p-2 rounded-md w-32 text-[#DEE1E2] bg-gray-800 shadow-lg absolute z-10 ${
                      isOpen.innercategory ? "max-h-60" : "hidden"
                    } custom-scrollbar`}
                  >
                    {category.innercategoryData?.map((iner, i) => (
                      <li
                        key={i}
                        className={`p-2 mb-2 text-sm text-[#DEE1E2]  rounded-md cursor-pointer hover:bg-blue-200/60 ${
                          state.innercategory === iner?.name
                            ? "bg-rose-600"
                            : ""
                        }`}
                        onClick={() =>
                          handleDropChange("innercategory", iner?._id)
                        }
                      >
                        <span>{iner?.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* <textarea
              value={companiesData.discription}
              onChange={handleChange}
              name="discription"
              className="w-full h-24 py-4 pl-4 font-medium bg-green-100 border border-transparent border-gray-400 rounded-md outline-none md:col-span-2 focus:border-blue-200 "
              placeholder="Write Details"
              required
            /> */}
              {/* <TextEditor
                value={state?.content}
                OnChangeEditor={(e: string) => HandleChange("content", e)}
              /> */}

              <div className="col-span-1 md:col-span-2">
                <TextEditor
                  value={state?.content}
                  OnChangeEditor={(e) => handleDropChange("content", e)}
                />
              </div>
            </div>

            <div className="flex">
              <button
                className="px-4 py-2 text-white rounded-md bg-[#1f3c88] hover:bg-[#2d56bb] disabled:bg-gray-500"
                type="submit"
                disabled={
                  !state?.thumnail ||
                  !state?.maincategory ||
                  !state?.title ||
                  !state?.content
                }
              >
                Submit
                {/* {Object.keys(data || {})?.length !== 0 ? "Update" : "Submit"} */}
              </button>
              <button
                className="px-4 py-2 ml-8 text-white rounded-md bg-rose-600 hover:bg-rose-700"
                type="button"
                onClick={clearhandler}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Category;
