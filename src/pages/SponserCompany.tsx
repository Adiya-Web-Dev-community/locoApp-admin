import { useState } from "react";
import AwarenessCategoryForm from "../forms/AwarenessCategoryForm";
import { IoIosSend } from "react-icons/io";
import { useDeletePostMutation, useGetDataQuery } from "../api";
import { toast } from "react-toastify";
import ConfirmDeleteModal from "../components/modal/DeleteModal";
import Loader from "../components/loader";
import { Link, useNavigate } from "react-router-dom";
import CompaniesLoading from "../components/loading_animation/LoadingAnimation";
import ConfirmationDialog from "../components/modal/ConfirmationDialog";
import Pagination from "../components/pagination/Pagination";
import VideoModal from "../components/modal/VideoModal";

const SponserCompany = () => {
  // const categoryDataLatest = useSelector(
  //   (state) => state.category.categoryData
  // );

  //   const [isCategoryForm, setCategoryForm] = useState({
  //     creat: false,
  //     updateId: "",
  //   });
  //   const [updateData, setUpdateDate] = useState({
  //     name: "",
  //   });

  //   const handlingCategory = () => {
  //     setCategoryForm((prev) => ({
  //       ...prev,
  //       creat: !prev.creat,
  //     }));
  //     setUpdateDate({
  //       name: "",
  //     });
  //   };

  //   console.log(categorysData);

  const { data, isLoading, error, isError } = useGetDataQuery({
    url: "/sponsor/company",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  //calculation of page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentCompanies = data?.slice(indexOfFirstItem, indexOfLastItem);

  console.log(currentCompanies, "pagination");

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const [dialogCrendial, setDialogCrendial] = useState({
    targetUrl: "",
    showDialog: false,
  });

  const [videoModal, setVideoModal] = useState({
    conditon: false,
    url: "",
  });

  const navigate = useNavigate();

  const handleLinkClick = (url) => {
    setDialogCrendial((prev) => ({
      ...prev,
      targetUrl: url,
      showDialog: true,
    }));
  };

  const handleCloseDialog = () => {
    setDialogCrendial((prev) => ({
      ...prev,
      targetUrl: "",
      showDialog: false,
    }));
  };

  const handleConfirmRedirect = () => {
    window.open(dialogCrendial.targetUrl, "_blank");
    handleCloseDialog();
  };

  const [deletPost] = useDeletePostMutation();

  const [isModalOpen, setModalOpen] = useState({
    condition: false,
    id: "",
  });

  console.log(data);

  const handleCloseModal = () => {
    setModalOpen({
      condition: false,
      id: "",
    });
  };

  const deletcompany = (id) => {
    console.log(id, "from handler");
    setModalOpen((prev) => ({
      ...prev,
      condition: !prev.condition,
      id: id,
    }));
  };
  const updatecompany = (company) => {
    // setCategoryForm((prev) => ({
    //   ...prev,
    //   updateId: category._id,
    // }));
    // setUpdateDate((prev) => ({
    //   ...prev,
    //   name: category.name,
    // }));

    navigate(`/sponsor/company_form/${company._id}`);
  };

  const handleConfirmDelete = () => {
    // Handle the delete action here
    toast.loading("checking Details");
    console.log("Item deleted", isModalOpen.id);
    deletPost({
      url: `/sponsor/company/${isModalOpen.id}`,
    })
      .then((res) => {
        if (res.data.success) {
          toast.dismiss();
          toast.success(`${res.data.message}`);
        }
        console.log(res);
      })
      .catch((error) => {
        toast.dismiss();
        toast.error("Not successfull to delete");
      });
    setModalOpen({
      condition: false,
      id: "",
    });
  };

  const listHeadingCompanies = [
    "Name",
    "Type",
    "Logo",
    "Video",
    "Discription",
    "Website",
    "Status",
    "Products",
    // "Since",
    "Setting",
  ];

  const handlingVideo = (url) => {
    setVideoModal((prev) => ({
      ...prev,
      conditon: true,
      url: url,
    }));
  };

  const handleCloseVideoModal = () => {
    setVideoModal((prev) => ({
      ...prev,
      conditon: false,
      url: "",
    }));
  };

  return (
    <>
      {/* {(isCategoryForm.creat || isCategoryForm.updateId) && (
        <AwarenessCategoryForm
          singleCategory={updateData}
          isCategoryForm={isCategoryForm}
          setCategoryForm={setCategoryForm}
        />
      )} */}
      {isLoading && <Loader />}
      {isModalOpen.condition && (
        <ConfirmDeleteModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
      )}
      {videoModal.conditon && (
        <VideoModal url={videoModal.url} onClose={handleCloseVideoModal} />
      )}
      <section
        className={`  md:pl-0 p-4 pt-16 w-full rounded-md font-philosopher  mx-auto [&::-webkit-scrollbar]:hidden bg-blue-50`}
      >
        <section
          className={` md:p-8 p-6
  
h-full
        border-gray-200 
    rounded-md  font-philosopher max-w-full w-full shadow-md`}
        >
          <div className="flex items-center mb-2 md:mb-6">
            <h1 className=" text-[28px] font-bold md:text-4xl text-gray-600">
              Companies
            </h1>
          </div>
          <div className="flex justify-between mb-4">
            <div className={`flex items-center   `}>
              <input
                type="search"
                placeholder={`Search`}
                className={` p-2 text-sm md:text-base  sm:px-4 py-1 border-[2px] border-transparent 
           bg-slate-50 focus:border-gray-100
        shadow-inner rounded-[0.26rem] outline-none `}
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                // onFocus={() => setCurrentPage(1)}
              />
            </div>
            <div className="relative flex items-center self-end ">
              <button
                className={` px-2 py-1 
                   bg-[#1f3c88] hover:bg-[#2d56bb]  text-[#DEE1E2] font-semibold
              }    rounded shadow-xl md:px-4 md:py-2  sm:self-center`}
              >
                <Link to={"/sponsor/company_form"}>
                  <span className="hidden md:inline-block">
                    Add Sponsor Company
                  </span>

                  <IoIosSend className="w-6 h-6 md:hidden" />
                </Link>
              </button>
            </div>
          </div>
          <section
            className={`w-full overflow-auto   border-2 [&::-webkit-scrollbar]:hidden rounded-lg border-gray-200 shadow-md bg-white`}
          >
            <section className="grid grid-cols-customCompanies pb-2 p-2  gap-4   min-w-[1200px] font-medium md:font-semibold bg-white">
              <p className="pl-2 md:text-lg">SrNo.</p>

              {listHeadingCompanies.map((heading, index) => (
                <p
                  key={index}
                  className={`   md:text-lg ${
                    index !== 0 ? "justify-self-center" : "ml-10"
                  }`}
                >
                  {heading.charAt(0).toUpperCase() + heading.slice(1)}
                </p>
              ))}
            </section>
            <div className=" h-[380px] overflow-y-auto [&::-webkit-scrollbar]:hidden min-w-[1200px] bg-gray-50">
              {isLoading ? (
                // Loading element for the table
                <CompaniesLoading />
              ) : isError ? (
                <p className="flex items-center justify-center w-full h-full font-medium text-center text-rose-800">
                  Check Internet connection or Contact to Admin
                </p>
              ) : (
                data?.map((company, i) => (
                  <section
                    key={i}
                    className="grid items-center gap-6 py-2 pl-6 pr-4 border-t-2 border-gray-200 grid-cols-customCompanies group hover:bg-gray-50"
                  >
                    <span>{i + 1}</span>

                    <span
                      className={`  font-semibold text-center  rounded-full  `}
                    >
                      {company?.name}
                    </span>

                    <span className="text-sm font-semibold break-words break-all text-ellipsis">
                      {company?.type}
                    </span>

                    <div className="flex items-center justify-center">
                      {company?.image ? (
                        <img
                          src={company?.image}
                          alt="company Image"
                          className="object-contain w-24 h-24 rounded-lg"
                        />
                      ) : (
                        <span className="text-sm font-bold text-gray-400">
                          No Image
                        </span>
                      )}
                    </div>
                    <span
                      className="flex justify-center ml-2 text-sm font-semibold cursor-pointer hover:underline hover:text-sky-400"
                      typeof="button"
                      onClick={() => handlingVideo(company?.video)}
                    >
                      {company?.video ? "View Video" : "--"}
                    </span>
                    <span className="flex justify-center ml-4 text-sm font-semibold ">
                      {company?.description || "--"}
                    </span>
                    <span
                      onClick={() =>
                        company?.link && handleLinkClick(company.link)
                      }
                      className={`ml-2 text-sm font-semibold text-center ${
                        company?.link
                          ? "hover:underline hover:text-sky-400 "
                          : ""
                      } break-words break-all cursor-pointer `}
                    >
                      {company?.link ? "Official site" : "----"}
                    </span>
                    <ConfirmationDialog
                      show={dialogCrendial.showDialog}
                      onClose={handleCloseDialog}
                      onConfirm={handleConfirmRedirect}
                    />
                    <span className="flex justify-center ml-2 text-sm font-semibold ">
                      {company?.active === true ? "Active" : "not Active"}
                    </span>
                    <span className="flex justify-center ml-2 text-sm font-semibold ">
                      {company?.products.length || 0}
                    </span>
                    {/* <span className="flex justify-center ml-2 text-sm font-semibold ">
                  {company?.dateAdded || "---"}
                </span> */}

                    <div className="grid justify-center gap-2">
                      <button
                        className="px-3 py-2 text-sm font-semibold text-white rounded-md bg-[#1f3c88] hover:bg-[#2d56bb]"
                        onClick={() => updatecompany(company)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-2 text-sm font-semibold text-white rounded-md bg-rose-600 hover:bg-rose-700"
                        onClick={() => deletcompany(company._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </section>
                ))
              )}
            </div>
          </section>

          <Pagination
            currentPage={currentPage}
            apiData={data}
            itemsPerPage={itemsPerPage}
            handleClick={handleClick}
          />
        </section>
      </section>
    </>
  );
};

export default SponserCompany;
