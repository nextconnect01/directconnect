import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import { Menu, X } from "lucide-react";

const Navbar = ({ textColor = "text-white" }) => {
  const backendUri = import.meta.env.VITE_BACKEND_URL;

  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${backendUri}/api/v1/user/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className={`w-full ${textColor} px-4 py-3`}>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-2">
          
        <img src="/images/logoFinal.png" alt="imagess"  className="max-w-14 rounded-lg object-cover"/>
        <h1 className="text-xl font-bold">Next Connect</h1>
        </div>
        
        <div className="block lg:hidden">
          {isMobileMenuOpen ? (
            <X
              className="text-white cursor-pointer"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          ) : (
            <Menu
              className="text-white cursor-pointer"
              onClick={() => setIsMobileMenuOpen(true)}
            />
          )}
        </div>

        <div className="hidden lg:flex gap-6">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/offering">Offering</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/coming-soon">Coming Soon</Link>
        </div>

        <div className="hidden lg:flex items-center gap-5">
          {!user ? (
            <>
              <Button
                onClick={() => navigate("/SignUp")}
                className="bg-[#FCFCFC] text-black hover:bg-gray-800 hover:text-white"
              >
                Sign Up
              </Button>
              <Button
                onClick={() => navigate("/login")}
                className="bg-[#2164f3] text-[#FCFCFC] hover:bg-gray-800 hover:text-white"
              >
                Login
              </Button>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profilePhoto} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-60">
                <div className="grid gap-4">
                  <h1>{user.fullName || "Karan Dalakoti"}</h1>
                  <div className="grid gap-2">
                    <Button
                      onClick={() => navigate("/editProfile")}
                      className="bg-[#FCFCFC] text-black hover:bg-gray-800 hover:text-white"
                      variant="outline"
                    >
                      View Profile
                    </Button>
                    <Button
                      onClick={logoutHandler}
                      className="hover:bg-gray-800 hover:text-white bg-[#2164f3] text-white"
                      variant="outline"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="flex flex-col gap-4 mt-4 lg:hidden">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
            About
          </Link>
          <Link to="/offering" onClick={() => setIsMobileMenuOpen(false)}>
            Offering
          </Link>
          <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)}>
            Blog
          </Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
            Contact
          </Link>

          {!user ? (
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => {
                  navigate("/SignUp");
                  setIsMobileMenuOpen(false);
                }}
                className="bg-[#FCFCFC] text-black hover:bg-gray-800 hover:text-white"
              >
                Sign Up
              </Button>
              <Button
                onClick={() => {
                  navigate("/login");
                  setIsMobileMenuOpen(false);
                }}
                className="bg-[#2164f3] text-[#FCFCFC] hover:bg-gray-800 hover:text-white"
              >
                Login
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => {
                  navigate("/editProfile");
                  setIsMobileMenuOpen(false);
                }}
                className="bg-[#FCFCFC] text-black hover:bg-gray-800 hover:text-white"
                variant="outline"
              >
                View Profile
              </Button>
              <Button
                onClick={logoutHandler}
                className="hover:bg-gray-800 hover:text-white bg-[#2164f3] text-white"
                variant="outline"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
