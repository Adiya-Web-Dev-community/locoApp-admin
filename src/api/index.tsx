
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
 export const APIS = createApi({
  reducerPath: "webBuilderApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (newPost) => {
        const token = localStorage.getItem("user");
        return {
          url: newPost.path,
          method: "POST",
          body: newPost.data,
          headers: {
            Authorization: `${token}`,
          },
        };
      },
    }),
    updatePost: builder.mutation({
      query: (newPost) => {
        const tokenn = localStorage.getItem("user");
        return {
          url: newPost.path,
          method: newPost?.method || "PUT",
          body: newPost.data, 
          headers: {
            Authorization: `${newPost.token || tokenn}`,
          },
        };
      },
    }),
    getData: builder.query({
      query: (path) => {
        const token = localStorage.getItem("user");
        return {
          url: path.url,
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        };
      },
    }),
    deletePost: builder.mutation({
      query: (newPost) => {
        const tokenn = localStorage.getItem("user");
        return {
          url: newPost.url,
          method: "DELETE",
          headers: {
            Authorization: `${newPost.token || tokenn}`,
          },
        };
      },
    }),
  }),
});


export const { useCreatePostMutation, useUpdatePostMutation, useGetDataQuery,useDeletePostMutation } =
APIS;
