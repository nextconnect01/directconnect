import cloudinary from "../db/cloudinary.js";
import getDataUri from "../db/datauriparser.js";
import { Blog } from "../models/blog.model.js";
import { User } from "../models/user.model.js";

export const createBlog = async (req, res) => {
  try {
    
    const user = await User.findById(req.id)
    

    if(!user){      
      return res.status(404).json({
        message : "User not found",
        success : false
      })
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only.", success: false });
    }
    
    const { title, description, content } = req.body;
    console.log(title, description, content);

    // Validate fields
    if (!title) {
      return res.status(400).json({
        message: "Blog Title is not filled",
        success: false,
      });
    }

    if (!description) {
      return res.status(400).json({
        message: "Blog description is not filled",
        success: false,
      });
    }

    if (!content) {
      return res.status(400).json({
        message: "Blog content is not filled",
        success: false,
      });
    }

    console.log("Files: ", req.files);
    const blogPhoto = req.files?.blogPhoto?.[0];
    console.log("Extracted blogPhoto: ", blogPhoto);

    let blogCloudinary;
    if (blogPhoto) {
      try {
        const blogUri = getDataUri(blogPhoto);

        blogCloudinary = await cloudinary.uploader.upload(blogUri.content, {
          resource_type: "auto",
          public_id: `blog_image/${Date.now()}`,
          access_mode: "public",
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: "Error uploading blog image to Cloudinary",
          success: false,
        });
      }
    }

    if (!blogCloudinary) {
      return res.status(400).json({
        message: "Blog Image is not present",
        success: false,
      });
    }

    // Parse content if it's a string
    const parsedContent = typeof content === "string" ? JSON.parse(content) : content;

    // Check for duplicate title
    const existingBlog = await Blog.findOne({ title });
    if (existingBlog) {
      return res.status(400).json({
        message: "Blog with the same name exists",
        success: false,
      });
    }

    // Create new blog
    const blog = await Blog.create({
      title,
      description,
      content: parsedContent,
      image: blogCloudinary.url,
    });

    return res.status(201).json({
      message: "Blog Created Successfully",
      blog,
      success: true,
    });
  } catch (error) {
    console.log("Error creating blog:", error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};


export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(400).json({
        message: "No such blog found",
        success: false,
      });
    }

    // Delete image from cloudinary as it will occupy space for no reason
    const publicId = blog.image.split("/").pop().split(".")[0]; // fetching the exact id of the cloudinary image
    await cloudinary.uploader.destroy(`blog_image/${publicId}`);

    await Blog.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Blog Deleted Successfully ",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: " Something went wrong",
      success: false,
    });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(400).json({
        message: "No such blog found",
        success: false,
      });
    }

    const { title, description, content } = req.body;
    console.log((title, description, content));

    const blogPhoto = req.files?.blogPhoto?.[0];
    console.log(blogPhoto);

    let blogCloudinary;
    if (blogPhoto) {
      try {
        const blogUri = getDataUri(blogPhoto);
        blogCloudinary = await cloudinary.uploader.upload(blogUri.content, {
          resource_type: "auto",
          public_id: `blog_image/${Date.now()}`,
          access_mode: "public",
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (!blogCloudinary) {
      return res.status(400).json({
        message: "No Image is uploaded on cloudinary",
        success: false,
      });
    }

    const updatedImage = blogCloudinary.secure_url;

    blog.title = title;
    blog.description = description;
    blog.content = content;
    blog.image = updatedImage;

    await blog.save();

    return res.status(200).json({
      message: "Blog Updated Successfully",
      success: true,
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const allBlog = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const blog  = await Blog.find(query).sort({createdBy :  -1});
    if(!blog){
      return res.status(400).json({
        blog,
        message : "No Blog is present at the moment",
        success : false
      })
    }

    return res.status(200).json({
      message : "These are the blog that matched to your search",
      blog,
      success : true
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message : "Internal Server ERROR ",
      success : false
    })
  }
};

export const getBlogById = async (req,res) => {
  try {
    const blogId = req.params.id;

    // Validate blogId
    // if (!mongoose.Types.ObjectId.isValid(blogId)) {
    //   return res.status(400).json({
    //     message: "Invalid blog ID",
    //     success: false,
    //   });
    // }

    const blog = await Blog.findById(blogId)

    if(!blog){
      return res.status(404).json({
        message : "No Such Blog found",
        success : false
      })
    }

    return res.status(200).json({
      message : "Blog Found",
      success : true,
      blog
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message : "Internal Server Error",
      success : false
    })
    
  }
}