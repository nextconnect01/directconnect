import { Bell, Loader2, Mail, Menu, Search } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import axios from "axios";
import { toast } from "sonner";
import { clearUserContacts, setUser } from "@/redux/authSlice";

const Navbar = () => {
  const [showJobPopover, setShowJobPopover] = useState(false);
  const [talentPopover, setTalentPopover] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [loading, setLoading] = useState(false);
  const backendUri = import.meta.env.VITE_BACKEND_URL;
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const {unreadNotifications} = useSelector(store => store.realTimeNotification)
  const logoutHandler = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendUri}/api/v1/user/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full shadow-xl pb-3">
      {!user ? (
        <div className="flex justify-between text-white ">
          <div className="flex justify-center items-center gap-2">
            <img
              src="/images/logoFinal.png"
              alt="imagess"
              className="max-w-14 rounded-lg object-cover"
            />
            <h1 className="text-xl font-bold">Next Connect</h1>
          </div>
          <div className="flex text-lg mt-[10px] gap-5">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/offering">Offerings</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/coming-soon">Coming Soon</Link>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => navigate("/SignUp")}
              className="bg-[#FCFCFC] text-black hover:bg-[#FCFCFC] hover:text-black"
            >
              Sign Up
            </Button>
            <Button
              onClick={() => navigate("/login")}
              className="bg-[#2164f3] text-[#FCFCFC] hover:bg-[hsl(221,64%,36%)] hover:text-white"
            >
              Login
            </Button>
          </div>
        </div>
      ) : user?.role === "client" ? (
        <div className="  bg-white w-full flex justify-center gap-7  py-4 px-5">
          <div className="flex justify-center items-center gap-2">
            <img
              src="/images/logoFinal.png"
              alt="imagess"
              className="max-w-14 rounded-lg object-cover"
            />
<h1 className="hidden xl:block text-xl font-bold">Next Connect</h1>
<button
              className="md:hidden ml-4"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu />
            </button>
          </div>

          {/* Updated mobile menu */}
          <div
            className={`md:flex gap-6 ${
              menuOpen ? "flex flex-col gap-3" : "hidden"
            } md:block mt-3`}
          >
            <Link
              className="text-md hover:text-blue-500"
              to="/client-dashboard"
            >
              Dashboard
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setTalentPopover(true)}
              onMouseLeave={() => setTalentPopover(false)}
            >
              <Link className="text-md hover:text-blue-500" to="/find-talent">
                Find Talent
              </Link>
              {talentPopover && (
                <div className="absolute right-0 left-0 mt-2 w-48 bg-white shadow-lg border rounded-md p-2">
                  <Link
                    className="block px-4 py-2 text-gray-700 hover:text-blue-600"
                    to="/find-talent"
                  >
                    Top Freelancer
                  </Link>

                  <Link
                    className="block px-4 py-2 text-gray-700 hover:text-blue-600"
                    to="/completed-jobs"
                  >
                    AI Freelancer
                  </Link>
                  <Link
                    className="block px-4 py-2 text-gray-700 hover:text-blue-600"
                    to="/job-archives"
                  >
                    Verified Freelancer
                  </Link>
                </div>
              )}
            </div>
            <div
              className="relative"
              onMouseEnter={() => setShowJobPopover(true)}
              onMouseLeave={() => setShowJobPopover(false)}
            >
              <Link className="text-md hover:text-blue-500" to="/myJobs">
                My Job
              </Link>

              {showJobPopover && (
                <div className="absolute right-0 left-0 mt-2 w-48 bg-white shadow-lg border rounded-md p-2">
                  <Link
                    className="block px-4 py-2 text-gray-700 hover:text-blue-600"
                    to="/active-jobs"
                  >
                    Active Jobs
                  </Link>

                  <Link
                    className="block px-4 py-2 text-gray-700 hover:text-blue-600"
                    to="/completed-jobs"
                  >
                    Completed Jobs
                  </Link>
                  <Link
                    className="block px-4 py-2 text-gray-700 hover:text-blue-600"
                    to="/job-archives"
                  >
                    Job Archives
                  </Link>
                </div>
              )}
            </div>
            <div
              className="relative"
              onMouseEnter={() => setShowPopover(true)}
              onMouseLeave={() => setShowPopover(false)}
            >
              <Link className="text-md hover:text-blue-500">
                Talent Selection
              </Link>

              {showPopover && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg border rounded-md p-2">
                  <Link
                    className="block px-4 py-2 text-gray-700 hover:text-blue-600"
                    to="/hire-selectionAssistant"
                  >
                    Hire Selection Assistant
                  </Link>
                  <Link
                    className="block px-4 py-2 text-gray-700 hover:text-blue-600"
                    to="/screening-tools"
                  >
                    Screening Tools
                  </Link>
                </div>
              )}
            </div>{" "}
            <Link className="text-md hover:text-blue-500" to="/transaction">
              Transaction
            </Link>
            <Link className="text-md hover:text-blue-500" to="/community">
              Community
            </Link>
          </div>

          <div className="flex gap-4">
            <div className="relative hidden lg:flex items-center">
              <input
                className="w-full min-w-[210px] pl-4 pr-10 py-2 border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500"
                placeholder="Search For a Talent"
                type="text"
              />
              <button className="absolute right-3 text-gray-500">
                <Search />
              </button>
            </div>
            <Button
              onClick={() => navigate("/post-jobs")}
              className="bg-[#146fb9] font-bold mt-2"
            >
              Post A Job
            </Button>
          </div>

          <div className="flex mt-3">
  <div className="relative cursor-pointer mr-4" onClick={() => navigate("/notification")}>
    <Bell className="text-gray-700 shadow-xl" />
    {unreadNotifications.length > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
        {unreadNotifications.length}
      </span>
    )}
  </div>
  <Mail
    onClick={() => navigate("/message")}
    className="cursor-pointer text-gray-700 shadow-xl"
  />
</div>


          <div >
            <Popover className="w-60" sideOffset={8} avoidCollisions={false} portalled={false}>
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
                    {loading ? (
                      <Button
                        variant="outline"
                        className="hover:bg-gray-800 hover:text-white bg-[#2164f3] text-white"
                      >
                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                        Please Wait
                      </Button>
                    ) : (
                      <Button
                        onClick={logoutHandler}
                        className="hover:bg-gray-800 hover:text-white bg-[#2164f3] text-white"
                        variant="outline"
                      >
                        Logout
                      </Button>
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      ) : (
        <div className="bg-white w-full flex justify-center gap-7   px-5">
          <div className="flex justify-center items-center gap-2">
            <img
              src="/images/logoFinal.png"
              alt="imagess"
              className="max-w-14 rounded-lg object-cover"
            />
            <h1 className="text-xl font-bold">Next Connect</h1>
            <button
              className="md:hidden ml-4"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu />
            </button>
          </div>
          <div className={`md:flex gap-6 ${
              menuOpen ? "flex flex-col gap-3" : "hidden"
            } md:block mt-3`}>
            <Link className="text-lg hover:text-blue-600" to="/find-jobs">
              Find Jobs
            </Link>
            <Link className="text-lg hover:text-blue-600" to="/my-project">
              My Project
            </Link>
            <Link className="text-lg hover:text-blue-600" to="/proposals">
              Proposals
            </Link>
            <Link className="text-lg hover:text-blue-600" to="/mentorship">
              Mentorship
            </Link>
            <Link className="text-lg hover:text-blue-600" to="/earnings">
              Earnings
            </Link>
            <Link className="text-lg hover:text-blue-600" to="/community">
              Community
            </Link>
          </div>

          <div className="flex gap-6">
            <div className="hidden relative md:flex items-center">
              <input
                className="w-full pl-4 pr-10 py-2 border border-gray-400 rounded-sm focus:outline-none focus:border-blue-500"
                placeholder="Search For a Talent"
                type="text"
              />
              <button className="absolute right-3 text-gray-500">
                <Search />
              </button>
            </div>
          </div>

          <div className="flex mt-3">
  <div className="relative cursor-pointer mr-4" onClick={() => navigate("/notification")}>
    <Bell className="text-gray-700 shadow-xl" />
    {unreadNotifications.length > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
        {unreadNotifications.length}
      </span>
    )}
  </div>
  <Mail
    onClick={() => navigate("/message")}
    className="cursor-pointer text-gray-700 shadow-xl"
  />
</div>

          <div className=" mr-7">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
