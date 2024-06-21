import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Layout from "./layout";
import Category from "./pages/category";
import Create_Category from "./pages/create-category";
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
          path: "/category",
          element: <Category />,
        },
        {
          path:"/create-category",
          element:<Create_Category/>
        }
      ],
    },
  ]);
  return <RouterProvider router={route} />;
}

export default App;
