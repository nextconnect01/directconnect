import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Check, IndianRupee, SquareCheck, User, X } from "lucide-react";
import RatingStars from "../shared/RatingStars";
import useGetAllFreelancersApplication from "@/hooks/useGetAllFreelancersApplication";
import { useDispatch, useSelector } from "react-redux";
import DialogEditApplication from "./DialogEditApplication";
import { setSelectedJob } from "@/redux/jobSlice";
import { setSelectedApplication } from "@/redux/applicationSlice";
import useGetAllFreelancersProposals from "@/hooks/useGetAllFreelancersProposals";
import { isToday } from "date-fns";
import { useNavigate } from "react-router-dom";
import { setMessagingClients } from "@/redux/authSlice";
import FreelancersFooter from "./FreelancersFooter";

const Proposals = () => {
  const [openApplication, setOpenApplication] = useState(false);
  useGetAllFreelancersApplication();
  useGetAllFreelancersProposals();
  const { allApplications } = useSelector((store) => store.application);
  const { allProposals } = useSelector((store) => store.application);
  const [input, setInput] = useState(null);
  const [applicationId, setApplicationId] = useState("");
  const {messagingClients} = useSelector(store => store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  
  const [applicationStatus,setApplicationStatus] = useState("all")
  const filteredApplications = allApplications?.filter((application) => {
    const status = application?.status || "";
    return applicationStatus === "all" || status === applicationStatus;
  })
  return (
    <div className="w-full pt-5 min-h-screen">
      <Navbar />
  
      <div className="w-full pb-5 bg-[#F5F5F5] flex justify-center px-4">
        <div className="w-full max-w-7xl mt-5 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          {/* Left Content */}
          <div className="w-full flex flex-col gap-4">
            <h1 className="text-xl font-bold">Proposals</h1>
  
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 border-b-2 border-slate-200 pb-5">
              <h1
                className={`cursor-pointer ${
                  input === "myApplications" ? "text-blue-800" : "text-black"
                }`}
                onClick={() => setInput("myApplications")}
              >
                My Applications
              </h1>
              <h1
                className={`cursor-pointer ${
                  input === "clientProposals" ? "text-blue-800" : "text-black"
                }`}
                onClick={() => setInput("clientProposals")}
              >
                Client Proposals
              </h1>
            </div>
  
            <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-sm text-slate-500">Show 4 Applications</p>
              <div className="flex items-center gap-2">
                <p className="text-sm text-slate-700">Filter :</p>
                <Select value={applicationStatus} onValueChange={(value) => setApplicationStatus(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="AllApplications" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem   value="all">All Applications</SelectItem>
                    <SelectItem value="accepted">Shortlisted</SelectItem>
                    <SelectItem value="pending">Under Review</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
  
            {/* Applications or Proposals */}
            {input !== "clientProposals"
              ? filteredApplications.map((application) => (
                  <div
                    key={application?._id}
                    className="bg-white rounded-lg border-l-4 border-blue-700 p-5 flex flex-col gap-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <h1 className="font-bold text-xl">
                        {application?.job?.title}
                      </h1>
                      <Badge
                        className={`w-fit mt-2 sm:mt-0 ${
                          application?.status === "pending"
                            ? "bg-blue-200 text-blue-700"
                            : application?.status === "accepted"
                            ? "bg-green-200 text-green-700"
                            : "bg-red-200 text-red-700"
                        }`}
                        
                        variant="outline"
                      >
                        {application?.status}
                      </Badge>
                    </div>
  
                    <p>{application?.job?.owner?.fullName}</p>
                    <p>{application?.job?.description}</p>
  
                    <div className="flex flex-col sm:flex-row justify-between gap-2">
                      <p className="flex gap-1">
                        <IndianRupee />
                        {application?.job?.salary}
                      </p>
                      <p>Applied 3 days ago</p>
                    </div>
  
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        className="bg-blue-700 text-white"
                        onClick={() => {
                          setOpenApplication(true);
                          setApplicationId(application?._id);
                          dispatch(setSelectedJob(application?.job));
                          dispatch(setSelectedApplication(application));
                        }}
                        variant="outline"
                      >
                        View Application
                      </Button>
                      <Button variant="outline">Send Message</Button>
                    </div>
  
                    <DialogEditApplication
                      application={applicationId}
                      open={openApplication}
                      setOpen={setOpenApplication}
                    />
                  </div>
                ))
              : allProposals.map((proposal) => (
                  <div
                    key={proposal?._id}
                    className="bg-white border-l-4 border-blue-700 p-5 flex flex-col gap-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <h1 className="font-bold text-xl">
                        You've received a proposal for '{proposal?.title}'
                      </h1>
                      <Badge variant="outline">{proposal?.status}</Badge>
                    </div>
                    <p>From: {proposal?.owner?.fullName}</p>
                    <p>{proposal?.description}</p>
                    <p className="text-blue-600 flex gap-1">
                      Budget: <IndianRupee /> {proposal?.salary}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                      <p>
                        {isToday(new Date(proposal?.createdAt))
                          ? "Today"
                          : `${Math.floor(
                              (Date.now() - new Date(proposal?.createdAt)) /
                                (1000 * 60 * 60 * 24)
                            )} days ago`}
                      </p>
                      <Button
                        onClick={() => {
                          dispatch(
                            setMessagingClients([
                              ...messagingClients,
                              proposal?.owner,
                            ])
                          );
                          navigate("/message");
                        }}
                        className="bg-blue-700 text-white hover:bg-blue-800"
                        variant="outline"
                      >
                        View Proposal
                      </Button>
                    </div>
                  </div>
                ))}
          </div>
  
          {/* Right Sidebar */}
          <div className="w-full lg:w-full flex flex-col gap-7">
            <div className="bg-white rounded-lg p-5 flex flex-col gap-4">
              <h1>Your Profile Overview</h1>
              <div className="flex justify-around text-center">
                <div>
                  <h1 className="text-2xl text-blue-600">12</h1>
                  <p>Proposals Sent</p>
                </div>
                <div>
                  <h1 className="text-2xl text-blue-600">3</h1>
                  <p>Active Projects</p>
                </div>
              </div>
  
              <div className="flex justify-between">
                <h1>Profile Completion</h1>
                <p>85%</p>
              </div>
              <div className="flex justify-between">
                <h1>Your Rating </h1>
                <p>6.3</p>
              </div>
  
              <RatingStars rating={3} />
              <Button
                onClick={() => navigate("/editProfile")}
                variant="outline"
                className="bg-blue-700 text-white w-full"
              >
                View Full Profile
              </Button>
            </div>
  
            <div className="bg-white rounded-lg p-5 flex flex-col gap-3">
              <h1>Quick Actions</h1>
              <div className="flex items-center gap-4 cursor-pointer">
                <User />
                <h1
                  onClick={() => navigate("/editProfile")}
                  className="hover:text-blue-600"
                >
                  Update Profile
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <SquareCheck />
                <h1 className="hover:text-blue-600">
                  Add New Skill & Certifications
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FreelancersFooter/>
    </div>
  );
  
};

export default Proposals;
