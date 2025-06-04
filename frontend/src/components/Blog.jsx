import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { ChevronsRight, Search } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import useGetAllBlog from "@/hooks/useGetAllBlog";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { setSearchQuery } from "@/redux/blogSlice";
import SEO from "./SEO";
import GuestNavbar from "./shared/GuestNavbar";

const Blog = () => {
  const params = useParams()
  const blogId = params.id
  
  useGetAllBlog()

  const dispatch = useDispatch()
  const [query,setQuery] = useState("")
  const { blogs } = useSelector((store) => store.blog);
  const navigate = useNavigate();

  const submitHandler = async () => {
    dispatch(setSearchQuery(query))
    // navigate("/browse")
  }

  useEffect(() => {
    dispatch(setSearchQuery("")); // Clear the search query to load all blogs
  }, [dispatch]);

  

  return (
    <div className="bg-slate-200">
      <SEO title="Blog Page" description="Welcome to our Blog Page "/> 
      <div
        className="relative w-full h-[70vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('images/blog/pexels-imudruk-10430644.jpg')",
        }}
      >
        <div className="absolute object-cover inset-0 bg-black opacity-70"></div>

        <div className="relative pt-7 px-7">
          <GuestNavbar />
          <div className="mt-28 flex flex-col items-center">
            <h1 className="text-6xl font-bold text-[#FCFCFC] text-center leading-tight">
              Insights and Tips <br />
            </h1>
          </div>
        </div>
      </div>

      <div className="mt-10 flex gap-5 px-5 ">
       <Input
       className="text-lg bg-white border-gray-200 shadow-lg"
        type = "text"
        placeholder = "Search For the Blogs"
        name = "blog"
        onChange = {(e) => setQuery(e.target.value)}
       />
       <Button onClick ={submitHandler} className= " bg-blue-600" variant = "outline"><Search/></Button>
      </div>

      {blogs?.length <= 0 ? (
        <span>No Blog To Show</span>
      ) : (
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12  pb-10 mt-10 px-12">
          {blogs?.map((blog) => (
          <div
          onClick={() => navigate(`/blogInside/${blog?._id}`)}
          key={blog?._id}
          className="relative flex flex-col cursor-pointer rounded-md shadow-md overflow-hidden group" // Added "group" class here
        >
          {/* Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, #e6e9fc, #e8f4ff)",
              zIndex: 1,
            }}
          ></div>
        
          {/* Hover Effect */}
          <div
            className="absolute inset-0 bg-gray-400 opacity-0 group-hover:opacity-50 transition duration-300"
            style={{ zIndex: 2 }}
          ></div>
        
          {/* Content (Image + Text) */}
          <div className="relative z-10 p-4">
            <img
              className="object-cover w-full rounded-md mb-4"
              src={blog?.image}
              alt="Blog"
            />
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="font-bold text-xl mb-2">{blog?.title}</h1>
                <p className="text-blue-600 mb-1">{blog?.createdAt.split("T")[0]}</p>
                <p className="text-gray-700 mb-3">{blog?.description}</p>
              </div>
              <div
               
                className="flex items-center cursor-pointer text-blue-600"
              >
                <p className="text-lg">Read More </p>
                <ChevronsRight />
              </div>
            </div>
          </div>
        </div>
        
         
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
