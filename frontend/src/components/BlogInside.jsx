import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetBlogById from "@/hooks/useGetBlogById";
import { setSingleBlog } from "@/redux/blogSlice";

const BlogInside = () => {
  const dispatch = useDispatch()
  useGetBlogById()
  const {singleBlog} = useSelector((store) => store.blog)
  useEffect(() => {
    dispatch(setSingleBlog(null))
  },[])
  
  return (
    <div className="w-full p-5">
      <div className="my-5">
        <Navbar textColor="text-black" />
      </div>

      <div className="flex justify-center items-start">
        <div className="w-8/10  flex flex-col justify-center items-center gap-4">
        {/* Yaha se vertical flex element start */}
        <h1 className="font-bold text-xl">
          {singleBlog?.title}
        </h1>
        <div className="flex gap-2">
          <img className="max-w-10 rounded-full" src="https://github.com/shadcn.png" alt="" />
          <p>Direct Connect</p>
          <p>{singleBlog?.createdAt.split("T")[0]}</p>
        </div>
        <div className="mt-10">
          <img className="max-w-3xl rounded-sm" src="images/blog/pexels-imudruk-10430644.jpg" alt="" />
        </div>
        {singleBlog?.content?.map((item) => <div key={singleBlog._id} className="flex flex-col">
          <h1 className="font-bold text-xl">{item.subheading} </h1>
          <p>{item.text}</p>
        </div>)}
        
        </div>
      </div>
    </div>
  );
};

export default BlogInside;
