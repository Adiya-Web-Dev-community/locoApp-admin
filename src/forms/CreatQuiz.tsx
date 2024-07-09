import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useUpdatePostMutation } from "../api";
import { toast } from "react-toastify";
import { TiArrowBackOutline } from "react-icons/ti";

const CreatQuiz = ({ isQuizForm, setQuizForm, singleQuiz }) => {
  console.log(singleQuiz);

  const [quizDataForm, setquizDataForm] = useState({
    title: singleQuiz.title ? singleQuiz.title : "",
    instructions: singleQuiz.instructions ? singleQuiz.instructions : "",
    completed: singleQuiz.completd ? singleQuiz.completd : false,
  });

  const [updatePost] = useUpdatePostMutation();

  const handleChange = (e) => {
    setquizDataForm((prev) => ({
      ...prev,
      [e?.target?.name]:
        e?.target?.type === "checkbox" ? e?.target?.checked : e?.target?.value,
    }));
  };

  const submiteHandler = async (e) => {
    e.preventDefault();

    console.log(quizDataForm);
    toast.loading("Checking Details");
    try {
      const payload = {
        title: quizDataForm?.title,
        instructions: quizDataForm?.instructions,
        isComplete: quizDataForm?.completed,
      };

      const response = await updatePost({
        data: payload,
        method: isQuizForm.creat ? "POST" : "PUT",
        path: isQuizForm.creat ? "/quiz" : `/quiz/${isQuizForm.updateId}`,
      });
      console.log(response);
      if (response?.data?.success) {
        toast.dismiss();
        toast.success(response?.data?.message, {
          autoClose: 5000,
        });
        closeHandler();
      } else {
        toast.dismiss();
        toast.error(
          `Failed to  ${isQuizForm.creat ? "Create Quiz" : "Update Quiz"}`
        );
      }
    } catch (error) {
      toast.dismiss();
      console.error(
        `Error ${isQuizForm.creat ? "Creating Quiz" : "Updating Quiz"} :`,
        error
      );
      toast.error(
        `Error ${
          isQuizForm.creat ? "Creating Quiz" : "Updating Quiz"
        } : ${error}`
      );
    }
  };

  const closeHandler = () => {
    if (isQuizForm.creat) {
      setQuizForm((prev) => ({
        ...prev,
        creat: !prev.creat,
      }));
    } else {
      setQuizForm((prev) => ({
        ...prev,
        updateId: "",
      }));
    }

    setquizDataForm({
      title: "",
      instructions: "",
      completed: false,
    });
    console.log(quizDataForm);
  };

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center px-4 sm:px-0 bg-black/40"
      onClick={closeHandler}
    >
      <div
        className="bg-white rounded-md w-[400px]"
        onClick={(e) => e.stopPropagation()}
      >
        <form className="" onSubmit={submiteHandler}>
          {/* left section */}
          <div className="p-6 px-8 rounded font-montserrat">
            <div className="flex pb-2">
              <h2 className=" md:text-4xl text-[28px] font-bold text-gray-700 font-mavenPro">
                Quiz Form
              </h2>
              <button onClick={closeHandler}>
                <TiArrowBackOutline className="w-10 h-10 ml-4 hover:text-orange-600 text-sky-600" />
              </button>
            </div>
            <div className="grid gap-4 py-4 gap-2h-full ">
              {/* <div className="w-full font-mavenPro"> */}
              <input
                value={quizDataForm?.title}
                type="text"
                onChange={handleChange}
                name="title"
                className={
                  " font-medium outline-none w-full  border h-10 border-gray-400 rounded-md pl-4 focus-within:border-blue-400  "
                }
                placeholder={"Add Title"}
                required
              />
              <input
                value={quizDataForm?.instructions}
                type="text"
                onChange={handleChange}
                name="instructions"
                className={
                  " font-medium outline-none w-full  border h-10 border-gray-400 rounded-md pl-4 focus-within:border-blue-400  "
                }
                placeholder={"Add Instruction here"}
                required
              />
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  checked={quizDataForm.completed}
                  onClick={handleChange}
                  name="completed"
                  className={
                    " font-medium outline-none   border border-gray-400 rounded-md pl-4 focus-within:border-blue-400  "
                  }
                  required
                />
                <span
                  className={`text-sm font-semibold ${
                    quizDataForm.completed ? "text-black" : "text-gray-500"
                  } `}
                >
                  Completed
                </span>
              </div>
            </div>

            <div className="flex ">
              <button
                className="px-4 py-2 text-white bg-[#1f3c88] rounded hover:bg-[#2950b1]"
                type="submit"
              >
                {/* Save Changes */}
                {isQuizForm.creat ? "Submit" : "Update"}
              </button>
              <button
                className="px-4 py-2 ml-8 text-white bg-red-500 rounded hover:bg-red-400"
                onClick={closeHandler}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatQuiz;
