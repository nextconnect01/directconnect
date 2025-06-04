import React from "react";
import Navbar from "../shared/Navbar";
import { Box, Brush, ChevronsLeftRight, ChevronUp, IndianRupee, MemoryStick, MessageCircle, PanelsTopLeft, PenTool } from "lucide-react";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import FreelancersFooter from "./FreelancersFooter";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetAllNotifications from "@/hooks/useGetAllNotifications";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { formatDistanceToNow } from "date-fns";


const FreelancerHome = () => {

  const navigate = useNavigate()
  const {user} = useSelector(store => store.auth)
  useGetAllNotifications()
  const {allNotifications} = useSelector(store => store.realTimeNotification)
  useGetAllJobs()
  const {jobs} = useSelector(store => store.job)
  return (
    <div className="w-full h-full">
      <div className="w-full h-full pt-5">
        <Navbar />
      </div>
      <div className="w-full pt-10 h-full bg-[#fcfcfc]">
        <div className="w-full h-full flex justify-center bg-[#fcfcfc]">
          <div className="max-w-7xl w-full h-[300px] flex justify-center gap-5   ">
            <div className="bg-blue-800 w-[450px] text-white rounded-lg p-7 ">
              <h1 className="font-bold text-4xl text-center ">
                Welcome Back {user?.fullName}
              </h1>
              <p className="mt-10 text-xl">
                Discover new opportunities and manage your freelancing career
                efficiently.
              </p>
            </div>
            <div className="flex flex-col justify-center items-center gap-7 rounded-lg p-5 bg-[rgb(241,236,236)] w-full">
              <p className="text-slate-700 text-xl font-bold">Your Performance Dashboard</p>
              <div className="flex gap-5">
                <div className="shadow-xl flex flex-col gap-3 justify-center items-center w-[200px] bg-white p-5 rounded-lg border-t-4 border-blue-800">
                  <h1 className="font-bold text-2xl">{user?.activeJob?.length}</h1>
                  <p>Active Jobs</p>
                </div>

                <div className="shadow-xl flex flex-col gap-3 justify-center items-center w-[200px] bg-white p-5 rounded-lg border-t-4 border-green-800">
                  <h1 className="font-bold text-2xl">{user?.projectCompleted}</h1>
                  <p>Project Completed</p>
                </div>

                <div className="shadow-xl flex flex-col gap-3 justify-center items-center w-[200px] bg-white p-5 rounded-lg border-t-4 border-yellow-500">
                  <h1 className="font-bold flex  text-2xl">
                    <IndianRupee className="mt-1" /> 10000
                  </h1>
                  <p>Earned This Month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <div className="max-w-7xl mt-10 w-full bg-white shadow-xl rounded-xl p-5 flex flex-col gap-7">
            <div className="flex justify-between">
              <h1 className="font-bold text-2xl">Your Dashboard</h1>
              <p className="cursor-pointer text-sm text-blue-500">
                View All Analytics
              </p>
            </div>
            <div className="grid grid-cols-4 gap-5">
              <div className="bg-blue-100 rounded-lg shadow-lg p-4 flex flex-col gap-4">
                <h1 className="font-bold text-3xl text-blue-800">8,492</h1>
                <p className="text-slate-600">Profile Views</p>
                <div className="flex ">
                  <ChevronUp className="text-green-500 " size={"18px"} />
                  <p className="text-sm text-green-500">24% from last month</p>
                </div>
              </div>

              <div className="bg-blue-100 rounded-lg shadow-lg p-4 flex flex-col gap-4">
                <h1 className="font-bold text-3xl text-blue-800">8,492</h1>
                <p className="text-slate-600">Job Proposals</p>
                <div className="flex ">
                  <ChevronUp className="text-green-500 " size={"18px"} />
                  <p className="text-sm text-green-500">24% from last month</p>
                </div>
              </div>

              <div className="bg-blue-100 rounded-lg shadow-lg p-4 flex flex-col gap-4">
                <h1 className="font-bold text-3xl text-blue-800">8,492</h1>
                <p className="text-slate-600">Proposals Success Rate</p>
                <div className="flex ">
                  <ChevronUp className="text-green-500 " size={"18px"} />
                  <p className="text-sm text-green-500">24% from last month</p>
                </div>
              </div>

              <div className="bg-blue-100 rounded-lg shadow-lg p-4 flex flex-col gap-4">
                <h1 className="font-bold text-3xl text-blue-800">8,492</h1>
                <p className="text-slate-600">Rank</p>
                <div className="flex ">
                  <ChevronUp className="text-green-500 " size={"18px"} />
                  <p className="text-sm text-green-500">24% from last month</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mt-10  flex justify-center">
            <div className="flex w-full max-w-7xl justify-between">
                <h1 className="font-bold text-2xl">Recommended for You
                </h1>
                <p onClick={() => navigate("/find-jobs")} className="text-sm text-blue-500 cursor-pointer">Browse All Jobs</p>
            </div>
           
        </div>
        <div className="flex w-full justify-center">
        <div className="w-full max-w-7xl mt-4 grid grid-cols-3 gap-5">
          {jobs?.map((job) => ( <div className="shadow-xl rounded-lg bg-white flex flex-col gap-3 py-5">
                    <h1 className="px-5 font-bold text-xl">
                    {job?.title}
                    </h1>
                    <div className="flex px-5 gap-4 border-b-2 border-slate-400 pb-4">
                      {job?.skills?.map((skill) =>                        <Badge variant="outline" className="bg-blue-100 text-blue-500 rounded-lg">{skill}</Badge>
 )}

                    </div>

                    <div className="grid grid-rows-4 gap-3 px-5">
                        <div className="flex justify-between">
                            <p className="text-slate-600">Budget :</p>
                            <div className="flex">
    <IndianRupee className=""/>
    {job?.salary}
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <p className="text-slate-600">Duration :</p>
                            <div className="flex">
    {job?.applicationDeadline.split("T")[0]}
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <p className="text-slate-600">Experience :</p>
                            <div className="flex">
    Intermediate To Expert
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <p className="text-slate-600">Posted :</p>
                            <div className="flex">
  {formatDistanceToNow(new Date(job?.createdAt), { addSuffix: true })}
</div>
                        </div>
                    </div>

                    <div className="bg-slate-100 mt-3 p-3 flex justify-between">
                      <div className="flex gap-2">
                        <Avatar>
                          <AvatarImage src =""/>
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <h1 className="font-bold text-xl">{job?.owner?.fullName}</h1>
                      </div>

                      <Button onClick={() => navigate("/find-jobs")} variant="outline" className="bg-blue-700 text-white">Apply Now</Button>
                    </div>
                </div>)) }
               

              

                 



                
            </div>
        </div>

        <div className="w-full flex justify-center mt-10">
          <div className="max-w-7xl w-full bg-white shadow-xl rounded-lg p-4 flex flex-col gap-7">
            <div className="flex justify-between">
              <h1 className="font-bold text-xl">Browse By Skills</h1>
              <p onClick={() => navigate("/find-jobs")} className="text-blue-500 cursor-pointer">View All Skills</p>
            </div>

            <div className="grid grid-cols-5 gap-3">
              <div className="bg-slate-100 rounded-lg p-5 flex flex-col gap-1 justify-center items-center">
                <div className="bg-blue-200 text-blue-600 rounded-full p-3">
<PanelsTopLeft />

                </div>
                <p className="font-bold">Web Design</p>
                <p className="text-sm text-slate-600">842 Jobs Available</p>

              </div>

              <div className="bg-slate-100 rounded-lg p-5 flex flex-col gap-1 justify-center items-center">
                <div className="bg-blue-200 text-blue-600 rounded-full p-3">
<ChevronsLeftRight />
                </div>
                <p className="font-bold">Web Development</p>
                <p className="text-sm text-slate-600">1204 Jobs Available</p>

              </div>

              <div className="bg-slate-100 rounded-lg p-5 flex flex-col gap-1 justify-center items-center">
                <div className="bg-blue-200 text-blue-600 rounded-full p-3">
<PenTool />
                </div>
                <p className="font-bold">Graphic Design</p>
                <p className="text-sm text-slate-600">764 Jobs Available</p>

              </div>

              <div className="bg-slate-100 rounded-lg p-5 flex flex-col gap-1 justify-center items-center">
                <div className="bg-blue-200 text-blue-600 rounded-full p-3">
<Box />
                </div>
                <p className="font-bold">3D Modeling</p>
                <p className="text-sm text-slate-600">329 Jobs Available</p>

              </div>

              <div className="bg-slate-100 rounded-lg p-5 flex flex-col gap-1 justify-center items-center">
                <div className="bg-blue-200 text-blue-600 rounded-full p-3">
<Brush />
                </div>
                <p className="font-bold">UI/UX </p>
                <p className="text-sm text-slate-600">567 Jobs Available</p>

              </div>

              <div className="bg-slate-100 rounded-lg p-5 flex flex-col gap-1 justify-center items-center">
                <div className="bg-blue-200 text-blue-600 rounded-full p-3">
<MemoryStick />                </div>
                <p className="font-bold">Digital Marketing</p>
                <p className="text-sm text-slate-600">412 Jobs Available</p>

              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center mt-10 pb-10">
          <div className="max-w-7xl w-full bg-white rounded-lg shadow-xl p-4 flex flex-col gap-4">
            <div className="flex justify-between">
<p className="font-bold text-xl">Latest Activity</p>
<p onClick={() => navigate("/notification")} className="text-sm text-blue-600 cursor-pointer"> View All Activity</p>
            </div>
{allNotifications?.map((notification) => (<div className="bg-slate-100 p-3 flex justify-between items-center rounded-lg">
              <div className="flex items-center gap-3">
                <div className="rounded-full flex justify-center w-[30px] h-[30px] bg-blue-100 text-blue-500">
<MessageCircle />
                </div>
                <div className="flex flex-col gap-2">
<h1 className="font-bold">New {notification?.category} from {notification?.sendersDetail?.fullName}
</h1>
<p className="text-slate-500">{notification?.message}
</p>
                </div>
              </div>
              <p className="text-sm text-slate-400">10 minutes ago</p>
            </div>)) }
            


            

          </div>
        </div>
      </div>
      <FreelancersFooter />
    </div>
  );
};

export default FreelancerHome;
