import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { ArrowLeft, Briefcase, Check, Clock8, Star, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import RatingStars from "../shared/RatingStars";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import DialogUpdateStatus from "./DialogUpdateStatus";
import RejectApplicationStatus from "./RejectApplicationStatus";
import OpenProposal from "./OpenProposal";
import DialogRejectStatus from "./DialogRejectStatus";

const ViewApplicants = () => {
  const [updateStatus, setUpdateStatus] = useState(false);
  const [rejectStatus, setRejectStatus] = useState(false);
  const { allApplicants } = useSelector((store) => store.application);
  const { selectedJob } = useSelector((store) => store.job);
  const [openProposal,setOpenProposal] = useState(false)
  const [application,setApplication] = useState("")


  const navigate = useNavigate();
  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="w-full  h-full bg-[#F5F5F5]">
        <div className="w-full pt-5   flex justify-center">
          <div className="max-w-7xl w-full flex justify-between">
            <h1 className="font-bold">Job Applicants</h1>
            <div className="flex gap-2 text-blue-600">
              <ArrowLeft
                className="cursor-pointer "
                onClick={() => navigate("/myJobs")}
              />
              <h1>Back To My Jobs</h1>
            </div>
          </div>
        </div>
        <div className="w-full mt-5 flex justify-center">
          <div className="w-full max-w-7xl rounded-lg bg-white shadow-xl p-5 flex flex-col gap-2">
            <div className="flex justify-between">
              <h1 className="font-bold text-xl ">{selectedJob?.title}</h1>
              <p className="text-sm">Budget</p>
            </div>
            <div className="flex justify-between">
              <Badge className="bg-blue-200 text-blue-600" variant="outline">
                {selectedJob?.status}
              </Badge>
              <h1 className="font-bold">${selectedJob?.salary}</h1>
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Due Date</p>
              <p className="font-bold">
                {selectedJob?.applicationDeadline.split("T")[0]}
              </p>
            </div>
            <div className="flex flex-col ">
              <h1 className="text-slate-500">Description</h1>
              <p className="text-sm text-slate700">
                {selectedJob?.description}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center mt-5">
          <div className="max-w-7xl w-full">
            <h1 className="font-bold mb-5">
              Applicants ({selectedJob?.application?.length})
            </h1>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <div className="max-w-7xl w-full flex flex-col gap-5">
            {selectedJob?.application?.length === 0 ? (
              <h1 className="mt-5 text-center font-bold mb-[200px]">
                As of now there are no applicants
              </h1>
            ) : (
              ""
            )}
            
            {selectedJob?.application?.map((app) => (
              <div
                className="bg-white rounded-lg  flex justify-between p-4 shadow-xl "
                key={app?._id}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex gap-5">
                    <Avatar className="w-[60px] h-[60px]">
                      <AvatarImage src={app?.applicant[0]?.user?.profile?.profilePhoto} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <h1 className="font-bold">{app?.applicant?.[0]?.user?.fullName}</h1>
                      <p className="text-slate-500 text-sm">{app?.applicant?.[0]?.user?.profile?.professionalTitle}</p>
                      <div className="flex gap-5 text-sm">
                        <div className="flex gap-1">
                          <Clock8 size={"18px"} />
                          Experience : 5 years
                        </div>

                        <div className="flex gap-1">
                          <Star  size={"18px"} />
                          5
                        </div>

                        <div className="flex gap-1">
                        <Briefcase size="18px" />
                          Completed Jobs : 20
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => {setOpenProposal(true); setApplication(app)}} className="bg-blue-700 text-white" variant="outline">View Proposal</Button>
                    <Button onClick={() => {setRejectStatus(true); setApplication(app) }} className="bg-red-200 text-red-700" variant="outline">Reject</Button>
                    <Button className="bg-green-200 text-green-700" variant="outline">Message</Button>
                  </div>
                </div>
                <Badge variant="outline" className="h-[30px] bg-orange-100 text-orange-400" >Pending</Badge>
              </div>
            ))}
            <DialogRejectStatus app={application} open={rejectStatus} setOpen={setRejectStatus}/>
            <OpenProposal app={application} open={openProposal} setOpen ={setOpenProposal}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewApplicants;
