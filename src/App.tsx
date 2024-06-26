import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Layout from "./layout";
import Category from "./pages/blog";
import Create_Category from "./pages/create-category";
import BlogList from "./pages/blog-list";
import UpdateBlog from "./pages/update-blog";
function App() {
  const route = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
      children: [
        {
          path: "",
          element: <Login />,
        },
      ],
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "category",
          element: <Category />,
        },
        {
          path: "create-blogcategory",
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
      ],
    },
  ]);
  return <RouterProvider router={route} />;
}

export default App;
