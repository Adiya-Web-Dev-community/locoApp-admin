// App.js
import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login";
import Layout from "./layout";

import Create_Category from "./pages/create-category";
import BlogList from "./pages/BlogList";
// import UpdateBlog from "./pages/update-blog";
import VideoCategory from "./pages/VideoCategory";

import UploadVideo from "./pages/uploadvideo";
// import UpdateVideo from "./pages/updatevideo";
import PrivateRoute from "./middleware/privateroute";

import ForgetPassword from "./pages/ForgetPassword";
import Authentication from "./pages/Authentication";
import ResetPassword from "./pages/ResetPassword";
import ErrorElement from "./pages/ErrorElement";
import Awareness from "./pages/Awareness";
// import AwarenessCategory from "./pages/AwarenessCategory";
import CreatAwareness from "./forms/CreatAwareness";
import AwarenessCategory from "./pages/AwarenessCategory";
import ImportantDocuments from "./pages/ImportantDocuments";
import CreatDocuments from "./pages/createDocument";
import UpdateDocuments from "./pages/update-document";
import SponserCompany from "./pages/SponserCompany";
import SponserCompaniesForm from "./forms/SponserCompaniesForm";
import SponsorCompanyProfile from "./pages/SponsorCompanyProfile";
import Video from "./pages/Videos";
import CreatBlog from "./pages/CreatBlog";

import UserUpdate from "./forms/UserUpdate";
import UserList from "./pages/UserList";

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
              path: "creat-blog",
              element: <CreatBlog />,
            },
            {
              path: "blogcategory",
              element: <Create_Category />,
            },
            {
              path: "creat-blog/blogs-list",
              element: <BlogList />,
            },
            {
              // path: "creat-blog/blogs-list/update-blog/:id",
              path: "creat-blog/blogs-list/update-blog/:id",
              element: <CreatBlog />,
              // element: <UpdateBlog />,
            },
            {
              path: "videocategory",
              element: <VideoCategory />,
            },

            {
              path: "users",
              element: <UserList />,
            },
            {
              path: "users/:id",
              element: <UserUpdate />,
            },
            {
              path: "videos",
              element: <Video />,
            },
            {
              path: "videos/:id",
              element: <UploadVideo />,
            },
            // {
            //   path: "video/:id",
            //   element: <UpdateVideo />,
            // },
            {
              path: "videos/upload-video",
              element: <UploadVideo />,
            },
            {
              path: "awareness",
              element: <Awareness />,
            },
            {
              path: "awareness/creat-awareness",
              element: <CreatAwareness />,
            },
            {
              path: "awareness/:id",
              element: <CreatAwareness />,
            },
            {
              path: "awarenes-category",
              element: <AwarenessCategory />,
            },
            {
              path: "important-document",
              element: <ImportantDocuments />,
            },
            {
              path: "important-document/create-documents",
              element: <CreatDocuments />,
            },
            {
              path: "important-document/update-documents/:id",
              element: <UpdateDocuments />,
            },
            {
              path: "sponsor",
              element: <SponserCompany />,
            },
            {
              path: "sponsor/profile/:id",
              element: <SponsorCompanyProfile />,
            },
            // {
            //   path: "sponsor/profile/:id/product_form",
            //   element: <ProductForm />,
            // },
            {
              path: "sponsor/company_form",
              element: <SponserCompaniesForm />,
            },
            {
              path: "sponsor/company_form/:id",
              element: <SponserCompaniesForm />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={route} />;
}

export default App;
