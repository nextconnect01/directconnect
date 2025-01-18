import { BLOG_API_ENDPOINT } from "@/constants";
import { setBlogs } from "@/redux/blogSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllBlog = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.blog.searchQuery);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const res = await axios.get(
          `${BLOG_API_ENDPOINT}/getAllBlog?keyword=${searchQuery}`,
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
