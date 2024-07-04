// App.js
import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login";
import Layout from "./layout";
import Category from "./pages/blog";
import Create_Category from "./pages/create-category";
import BlogList from "./pages/blog-list";
import UpdateBlog from "./pages/update-blog";
import VideoCategory from "./pages/video-category";
import Video from "./pages/videos";
import UploadVideo from "./pages/uploadvideo";
import UpdateVideo from "./pages/updatevideo";
import PrivateRoute from "./middleware/privateroute";
import Users from "./pages/users";
import UserUpdate from "./components/user-update";

import ForgetPassword from "./pages/ForgetPassword";
import Authentication from "./pages/Authentication";
import ResetPassword from "./pages/ResetPassword";
import ErrorElement from "./pages/ErrorElement";
import Awareness from "./pages/Awareness";
// import AwarenessCategory from "./pages/AwarenessCategory";
import CreatAwareness from "./forms/CreatAwareness";

function App() {
  const token = localStorage.getItem("user");
  const isValidToken = token ? true : false;
  console.log("Tokaen in Storage>>>", isValidToken);
  const route = createBrowserRouter([
    {
      path: "/login",
      element: !isValidToken ? <Authentication /> : <Navigate to="/" />,
      children: [
        // {
        //   path: "register",
        //   element: <RegisterUser />,
        // },
        {
          path: "",
          element: <Login />,
        },
        {
          path: "forgot-password",
          element: <ForgetPassword />,
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
      ],
    },

    {
      path: "/",
      element: <PrivateRoute token={isValidToken} />,
      children: [
        {
          path: "",
          element: <Layout />,
          errorElement: <ErrorElement />,
          children: [
            {
              path: "blog",
              element: <Category />,
            },
            {
              path: "blogcategory",
              element: <Create_Category />,
            },
            {
              path: "blogs",
              element: <BlogList />,
            },
            {
              path: "update-blog/:id",
              element: <UpdateBlog />,
            },
            {
              path: "videocategory",
              element: <VideoCategory />,
            },
            {
              path: "video",
              element: <Video />,
            },
            {
              path: "users",
              element: <Users />,
            },
            {
              path: "users/:id",
              element: <UserUpdate />,
            },

            {
              path: "video/:id",
              element: <UpdateVideo />,
            },
            {
              path: "upload-video",
              element: <UploadVideo />,
            },
            {
              path: "awareness",
              element: <Awareness />,
            },
            {
              path: "creat-awareness",
              element: <CreatAwareness />,
            },
            {
              path: "awareness/:id",
              element: <CreatAwareness />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={route} />;
}

export default App;
