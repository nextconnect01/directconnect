import { BLOG_API_ENDPOINT } from "@/constants";
import { setBlogs } from "@/redux/blogSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllBlog = () => {
  const backendUri = import.meta.env.VITE_BACKEND_URL;

  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.blog.searchQuery);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const res = await axios.get(
          `${backendUri}/api/v1/blog/getAllBlog?keyword=${searchQuery}`,
          { withCredentials: true }
        );
        if (res.data.success){
            dispatch(setBlogs(res.data.blog))

        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllBlogs()
  }, [dispatch,searchQuery]);
};

export default useGetAllBlog;
