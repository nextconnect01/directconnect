import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Bot, CalendarDays, ChevronsLeftRightEllipsis } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import useGetAdminJobs from "@/hooks/useGetAdminJobs";
import useGetAllSuggestedTalent from "@/hooks/useGetAllSuggestedTalent";
import { useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";
import { setUserContacts } from "@/redux/authSlice";
import useGetAllUnreadNoitifcations from "@/hooks/useGetAllUnreadNoitifcations";
import ClientFooter from "./ClientFooter";
import { setAdminJobs } from "@/redux/jobSlice";

const DashboardClient = () => {
  useGetAllUnreadNoitifcations()
  const [daysFilter, setDaysFilter] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {userContacts} = useSelector(store => store.auth)
  useGetAllSuggestedTalent();
  useGetAdminJobs();
  const { user } = useSelector((store) => store.auth);
  const { adminsJobs } = useSelector((store) => store.job);
  const handleFilterChange = (value) => {
    setDaysFilter(value === "all" ? null : Number(value));
  };
  
  const filteredJobs = daysFilter
  ? adminsJobs?.filter((job) => {
      const jobDate = new Date(job.createdAt);
      const now = new Date();
      const diffInDays = Math.floor((now - jobDate) / (1000 * 60 * 60 * 24));
      return diffInDays <= daysFilter;
    })
  : adminsJobs;

  const { suggestedFreelancers } = useSelector((store) => store.auth);
  const [displayFreelancers, setDisplayFreelancers] = useState([]);
  const completedJobsCount = adminsJobs?.filter(
    (job) => job.status === "completed"
  ).length;
  const activeJobsCount = adminsJobs?.filter(
    (job) =>
      job.status === "active" ||
      job.status === "progress" ||
      job.status === "paused"
  ).length;

  useEffect(() => {
    if (suggestedFreelancers?.length > 0) {
      const shuffled = [...suggestedFreelancers].sort(
        () => 0.5 - Math.random()
      );
      setDisplayFreelancers(shuffled.slice(0, 3));
    }
  }, [suggestedFreelancers]);
  const getNewConnectionsThisMonth = () => {
    if (!user?.connectedFreelancers) return 0;

    const now = new Date();
    return user.connectedFreelancers.filter(({ connectedAt }) => {
      const date = new Date(connectedAt);
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    }).length;
  };

  useEffect(() => {
    dispatch(setAdminJobs([]))
  },[])
  return (
    <div className="relative pt-5">
      <Navbar />
      <div className=" pb-5 flex flex-col lg:flex-row justify-center bg-[#fcfcfc] min-h-screen px-4 md:px-6">
        <div className="w-full lg:w-3/4 px-2 md:px-4 py-4">
          <div className="mt-10 flex flex-col max-w-5xl mx-auto gap-7">
            <h1 className="font-bold text-3xl">Client Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
              <div className="shadow-xl flex-1 min-w-[280px] h-[150px] flex p-5 rounded-lg flex-col justify-center gap-5 bg-white">
                <p className="text-xl">Active Jobs</p>
                <h1 className="text-2xl font-bold">{activeJobsCount}</h1>
                <p className="text-green-400">+2 from last month</p>
              </div>
              <div className="shadow-xl flex-1 min-w-[280px] h-[150px] flex p-5 rounded-lg flex-col justify-center gap-5 bg-white">
                <p className="text-xl">Talent Connection</p>
                <h1 className="text-2xl font-bold">
                  {user?.connectedFreelancers?.length}
                </h1>
                <p className="text-green-400">
                  +{getNewConnectionsThisMonth()} from last month
                </p>
              </div>
              <div className="shadow-xl flex-1 min-w-[280px] h-[150px] flex p-5 rounded-lg flex-col justify-center gap-5 bg-white">
                <p className="text-xl">Completed Project</p>
                <h1 className="text-2xl font-bold">{completedJobsCount}</h1>
                <p className="text-green-400">
                  +{completedJobsCount} from last month
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden">
            <div className="bg-white mt-7 mx-auto w-full  max-w-5xl rounded-md shadow-xl pt-10  ">
              <div className="flex w-full px-5  cursor-pointer justify-between pb-5 border-b">
                <h1 className="text-lg font-semibold">Active Jobs</h1>
                <h1 className="text-blue-500 cursor-pointer">View All</h1>
              </div>
              {filteredJobs?.map((job) => (
                <div
                  key={job?._id}
                  className="pt-5 px-5  cursor-pointer flex flex-col gap-2 bg-white w-full max-w-5xl rounded-md hover:bg-slate-200 mx-auto"
                >
                  <div className="flex justify-between">
                    <h1 className="text-lg">{job?.title}</h1>
                    <Badge
                      className={
                        job?.status === "active"
                          ? "bg-slate-200 text-green-600"
                          : job?.status === "progress"
                          ? "bg-yellow-200 text-yellow-600"
                          : job?.status === "completed"
                          ? "bg-blue-200 text-blue-600"
                          : ""
                      }
                      variant="outline"
                    >
                      {job?.status}
                    </Badge>
                  </div>
                  <div className="flex gap-5">
                    <div className="flex gap-1">
                    <ChevronsLeftRightEllipsis />
                    <p>{job?.category}</p>
                    </div>
                    <div className="flex gap-1">
                    <CalendarDays />
                    <p>
                      {job?.applicationDeadline
                        ? Math.ceil(
                            (new Date(job.applicationDeadline) - new Date()) /
                              (1000 * 60 * 60 * 24)
                          ) + " days left"
                        : "No Deadline"}
                    </p>
                    </div>
                    
                  </div>
                  <p>{job?.description}</p>
                  <div className="flex justify-between pb-5">
                    <p className="text-slate-700 text-sm">{job?.application?.length}  Applicants</p>
                    <p>Posted {Math.floor((new Date() - new Date(job?.createdAt)) / (1000 * 60 * 60 * 24))} days ago</p>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/4 px-2 md:px-4 py-4 flex flex-col gap-6">
          <div className="bg-white w-[180px] text-black">
            <Select onValueChange={handleFilterChange}>
              <SelectTrigger className="w-[180px] text-black ">
                <SelectValue className="" placeholder="Last 30 Days" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                <SelectItem value="allTime">All Time</SelectItem>

                  <SelectItem value = "7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 Days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="365">This Year </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-10 bg-white max-w-md flex flex-col justify-center rounded-md items-center gap-5 p-5">
            <Avatar>
              <AvatarImage src={user?.profilePhoto} alt="image" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <p>{user?.fullName}</p>
            <p className="text-slate-500">{user?.username}</p>
            <div className="flex justify-center px-5 gap-3">
              <div className="bg-slate-100 rounded-md flex p-4 flex-col gap-4 ">
                <h1>Feedback By Frelanceer </h1>
                <h1 className="font-bold text-xl">4.75</h1>
              </div>
              <div className="bg-slate-100 rounded-md p-4 flex flex-col gap-4 ">
                <h1>Talents Hired</h1>
                <h1 className="font-bold text-xl">
                  {user?.connectedFreelancers?.length}
                </h1>
              </div>
            </div>
            <Button
              onClick={() => navigate("/editProfile")}
              variant="outline"
              className="bg-white border-blue-500 w-full text-lg px-5 text-blue-500"
            >
              Edit Profile
            </Button>
          </div>

          <div className="mt-10 p-5 rounded-sm bg-blue-700 text-white font-bold flex max-w-md flex-col gap-5">
            <div className="flex gap-2">
              <Bot />
              <h1>Hiring Assistant</h1>
            </div>
            <p>
              Get tailored job descriptions, candidate matching, and skill
              assessments with our assistant.
            </p>
            <Button variant="outline" className="bg-white text-blue-500">
              Try Assistant
            </Button>
          </div>
          <div className="bg-white mt-5 max-w-md flex justify-between border-b-2 rounded-md border-slate-300  p-4 ">
            <h1 className="text-xl">Recommended Talent</h1>
            <p className="text-blue-500"> View All</p>
          </div>
          {displayFreelancers?.map((freelancers) => (
            <div
              className="flex  justify-between bg-white max-w-md p-3"
              key={freelancers?._id}
            >
              <div className="flex gap-2">
                <Avatar>
                  <AvatarImage
                    src={freelancers?.profile?.profilePhoto}
                    alt="image"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <h1>{freelancers?.fullName}</h1>
                  <p>
                    {freelancers?.profile?.bio
                      ?.split(" ")
                      .slice(0, 30)
                      .join(" ") +
                      (freelancers?.profile?.bio?.split(" ").length > 30
                        ? "..."
                        : "")}
                  </p>{" "}
                  <h1>Rating : 4</h1>
                </div>
              </div>

              <h1  onClick={() => {dispatch(setUserContacts([...userContacts,freelancers])); navigate("/message")}} className="text-blue-500 cursor-pointer">Connect</h1>
            </div>
          ))}
        </div>
      </div>
      <ClientFooter/>
    </div>
  );
};

export default DashboardClient;
