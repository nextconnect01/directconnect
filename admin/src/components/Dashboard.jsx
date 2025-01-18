import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const backendUri = import.meta.env.VITE_BACKEND_URL;
  const [blogs, setBlogs] = useState([]); // To manage the list of blogs
  const [blogForm, setBlogForm] = useState({
    title: "",
    description: "",
    blogPhoto: null,
    content: [{ subheading: "", text: "" }],
  });

  const token = useSelector((state) => state.auth.token);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogForm({ ...blogForm, [name]: value });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setBlogForm({ ...blogForm, blogPhoto: e.target.files[0] });
  };

  // Handle content array changes
  const handleContentChange = (index, field, value) => {
    const updatedContent = [...blogForm.content];
    updatedContent[index][field] = value;
    setBlogForm({ ...blogForm, content: updatedContent });
  };

  // Add a new content section
  const addContentSection = () => {
    setBlogForm({
      ...blogForm,
      content: [...blogForm.content, { subheading: "", text: "" }],
    });
  };

  // Remove a content section
  const removeContentSection = (index) => {
    const updatedContent = blogForm.content.filter((_, i) => i !== index);
    setBlogForm({ ...blogForm, content: updatedContent });
  };

  // Submit new blog
  const handleCreateBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", blogForm.title);
    formData.append("description", blogForm.description);
    formData.append("blogPhoto", blogForm.blogPhoto);
    formData.append("content", JSON.stringify(blogForm.content));

    try {
      console.log("token is ",token);
      
      const res = await axios.post(
        `${backendUri}/api/v1/blog/createBlog`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials : true
        }
      );
      if (res.data.success) {
        toast.success("Blog created successfully!");
        setBlogs((prev) => [...prev, res.data.blog]);
        setBlogForm({
          title: "",
          description: "",
          blogPhoto: null,
          content: [{ subheading: "", text: "" }],
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create blog");
    }
  };

  // Delete blog
  const handleDeleteBlog = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/blog/deleteBlog/${id}`
      );
      if (res.data.success) {
        toast.success("Blog deleted successfully!");
        setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete blog");
    }
  };

  // Update blog (redirect to a page or modal for updating)
  const handleUpdateBlog = (id) => {
    // Implement update logic here (e.g., redirect to update page)
    toast.info("Redirecting to update page...");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h2>
      {/* Blog Creation Form */}
      <form
        onSubmit={handleCreateBlog}
        className="bg-white shadow-lg rounded-lg p-6 space-y-4"
      >
        <h3 className="text-xl font-semibold">Create Blog</h3>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={blogForm.title}
            onChange={handleInputChange}
            placeholder="Enter Blog Title"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={blogForm.description}
            onChange={handleInputChange}
            placeholder="Enter Blog Description"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          ></textarea>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Blog Photo
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        {blogForm.content.map((section, index) => (
          <div key={index} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Content Section {index + 1}
            </label>
            <input
              type="text"
              placeholder="Subheading"
              value={section.subheading}
              onChange={(e) =>
                handleContentChange(index, "subheading", e.target.value)
              }
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
            <textarea
              placeholder="Text"
              value={section.text}
              onChange={(e) =>
                handleContentChange(index, "text", e.target.value)
              }
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            ></textarea>
            <button
              type="button"
              onClick={() => removeContentSection(index)}
              className="text-red-500 hover:underline"
            >
              Remove Section
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addContentSection}
          className="text-blue-500 hover:underline"
        >
          Add Content Section
        </button>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Create Blog
        </button>
      </form>

      {/* Blog List */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Your Blogs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white shadow-lg rounded-lg p-4 space-y-2"
            >
              <h4 className="text-lg font-bold">{blog.title}</h4>
              <p className="text-sm text-gray-700">{blog.description}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleUpdateBlog(blog._id)}
                  className="text-blue-500 hover:underline"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteBlog(blog._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
