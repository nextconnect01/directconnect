import { BLOG_API_ENDPOINT } from "@/constants";
import { setSingleBlog } from "@/redux/blogSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const useGetBlogById = () => {
  const backendUri = import.meta.env.VITE_BACKEND_URL;

  const params = useParams()
  const blogId = params.id

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchBlogById = async () => {
      try {
        const res = await axios.get(`${backendUri}/api/v1/blog/getBlogById/${blogId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleBlog(res.data.blog));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogById()
  }, [dispatch,blogId]);
};

export default useGetBlogById;
