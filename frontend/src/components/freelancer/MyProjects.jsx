import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import {
  ArrowDownUp,
  Grid2x2,
  ListFilter,
  Search,
  TableOfContents,
} from "lucide-react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useDispatch, useSelector } from "react-redux";
import useGetAllAcceptedJobs from "@/hooks/useGetAllAcceptedJobs";
import { useNavigate } from "react-router-dom";
import DialogSubmitWork from "./DialogSubmitWork";
import { setSelectedJob } from "@/redux/jobSlice";
import FreelancersFooter from "./FreelancersFooter";
import { setSelectedUser } from "@/redux/authSlice";

const MyProjects = () => {
  useGetAllAcceptedJobs();
  const { freelancersJobs } = useSelector((store) => store.job);
  console.log("update job", freelancersJobs);

  const [activeButton, setActiveButton] = useState(null);
  const [changeLayout, setChangeLayout] = useState("grid");
  const [submit, setSubmit] = useState(false);
  const [jobId, setJobId] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const statusFilter = [
    { label: "All Jobs", value: "" },
    { label: "Paused", value: "paused" },
    { label: "Completed", value: "completed" },
    { label: "Progress", value: "progress" },
  ];
  const [searchItem, setSearchItem] = useState("");
  const filteredJobs = freelancersJobs?.filter((freelancerJob) => {
    const title = freelancerJob?.job?.title.toLowerCase() || "";
    const status = freelancerJob?.job?.status;
    return title.includes(searchItem?.toLowerCase()) || status === searchItem;
  });

  return (
    <div className="w-full h-full  pt-5">
      <Navbar />
      <div className="w-full min-h-screen pb-5 h-full bg-[#fcfcfc]">
        <div className="w-full flex justify-center px-4">
          <div className="w-full max-w-7xl flex flex-col md:flex-row mt-7 md:justify-between gap-4">
            <h1 className="text-2xl font-bold">My Jobs</h1>

            {/* <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="border-blue-600 text-xl font-bold text-blue-600 bg-[#F5F5F5] p-3"
              >
                <ListFilter /> Filter
              </Button>

              <Button
                variant="outline"
                className="border-blue-600 text-xl font-bold text-blue-600 bg-[#F5F5F5] p-3"
              >
                <ArrowDownUp /> Sort
              </Button>
            </div> */}
          </div>
        </div>

        <div className="w-full flex justify-center px-4">
          <div className="flex flex-col gap-4 mt-4 w-full pb-5 max-w-7xl bg-white rounded-lg shadow-xl">
            {/* Filter + Buttons + Search */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center px-4 pt-4 gap-4">
              {/* Left: Filter Jobs + Buttons */}
              <div className="flex flex-col gap-2 w-full lg:w-auto">
                <h1 className="text-xl font-bold">Filter Jobs</h1>
                <div className="flex flex-wrap gap-2">
                  {statusFilter.map((status, index) => (
                    <Button
                      key={index}
                      className={`${
                        activeButton === index
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-black"
                      } hover:bg-blue-600 hover:text-white`}
                      onClick={() => {
                        setActiveButton(index);
                        setSearchItem(status.value);
                      }}
                      variant="outline"
                    >
                      {status.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Right: Search bar */}
              <div className="flex gap-2 items-center w-full sm:w-auto">
                <Search size={"20px"} className="text-gray-900" />
                <Input
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                  placeholder="Search Jobs ..."
                  type="text"
                  className="w-full h-[30px] sm:w-64"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="w-full border-t-2 border-gray-300 px-4"></div>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <div className="w-full mt-5 max-w-7xl flex gap-3 ml-5">
            {/* Grid View Icon */}
            <Grid2x2
              onClick={() => setChangeLayout("grid")}
              size={40}
              className={`cursor-pointer shadow-2xl rounded-md p-2 
        ${
          changeLayout === "grid"
            ? "bg-blue-600 text-white"
            : "bg-white text-black"
        }`}
            />

            {/* Table View Icon */}
            <TableOfContents
              onClick={() => setChangeLayout("table")}
              size={40}
              className={`cursor-pointer shadow-2xl rounded-md p-2 
        ${
          changeLayout === "table"
            ? "bg-blue-600 text-white"
            : "bg-white text-black"
        }`}
            />
          </div>
        </div>

        <div className="w-full flex justify-center">
          {changeLayout === "grid" ? (
            <div className="max-w-7xl w-full  grid grid-cols-1 md:grid-cols-3  xl:grid-cols-4 gap-5   rounded-lg p-2">
              {filteredJobs.map((application) => (
                <div
                  key={application?._id}
                  className="flex transition-transform duration-300 hover:-translate-y-2 py-5 rounded-xl shadow-xl bg-white flex-col gap-3 p-3"
                >
                  <div className=" flex justify-between">
                    <h1 className="font-bold text-xl">{application?.job?.title}</h1>
                    <Badge
                      className={`rounded-lg h-[20px] ${
                        application?.job?.status === "progress"
                          ? "text-green-600 bg-slate-200"
                          : application?.job?.status === "paused"
                          ? "text-yellow-600 bg-orange-200"
                          : application?.job?.status === "disputes"
                          ? "text-red-600 bg-red-200"
                          : application?.job?.status === "completed"
                          ? "text-blue-600 bg-blue-200"
                          : ""
                      }`}
                      variant="outline"
                    >
                      {application?.job?.status}
                    </Badge>
                  </div>
                  <div className="flex  gap-2 pb-2 border-b-2 border-gray-200">
                    <Avatar className=" h-8 w-8 rounded-full ">
                      <AvatarImage src="" alt="image" />
                      <AvatarFallback className="text-sm">
                        {application?.job?.owner?.fullName
                          ?.split(" ")
                          .map((word) => word[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>{" "}
                    </Avatar>

                    <p className="text-slate-500 text-sm mt-1">
                      {application?.job?.owner?.fullName}
                    </p>
                  </div>
                  <div className=" flex justify-between">
                    <p className="text-sm text-slate-500">Contract Type</p>
                    <h1>{application?.job?.budgetType} </h1>
                  </div>

                  <div className=" flex justify-between">
                    <p className="text-sm text-slate-500 ">Budget</p>
                    <h1> $ {application?.job?.salary} </h1>
                  </div>

                  <div className=" flex justify-between">
                    <p className="text-sm text-slate-500">Due Date</p>
                    <h1>
                      {application?.job?.applicationDeadline
                        ? new Date(
                            application?.job.applicationDeadline
                          ).toLocaleDateString()
                        : "No Deadline"}{" "}
                    </h1>
                  </div>

                  <div className="flex justify-between ">
                    {application?.job?.status === "progress" && (
                      <Button
                        onClick={() => {
                          setSubmit(true);
                          setJobId(application?.job?._id);
                        }}
                        variant="default"
                        className="bg-blue-700 text-white hover:bg-blue-800 hover:text-white"
                      >
                        Submit Work
                      </Button>
                    )}

                    {application?.job?.status === "paused" && (
                      <Button
                        onClick={() => {
                          // handlePausedClick(); // define this separately if needed
                        }}
                        disabled
                        variant="default"
                        className="bg-gray-300 text-gray-600 cursor-not-allowed"
                      >
                        Work Under Review
                      </Button>
                    )}

                    {application?.job?.status === "completed" && (
                      <Button
                        onClick={() => {
                          {
                            dispatch(setSelectedJob(application?.job));
                            navigate("/completedJobs");
                          }
                        }}
                        variant="outline"
                        className="text-blue-700 border-blue-700 hover:bg-blue-50"
                      >
                        View Detail
                      </Button>
                    )}

                    {application?.job?.status === "review" && (
                      <Button
                        onClick={() => {
                          dispatch(setSelectedJob(application?.job));
                          navigate("/viewRevision");
                        }}
                        variant="outline"
                        className="border-2 border-yellow-500 text-black"
                      >
                        Complete Revision
                      </Button>
                    )}

                    {application?.job?.status === "disputes" && (
                      <Button
                        onClick={() => {
                          // handleDisputeClick(); // custom logic for disputes
                        }}
                        variant="default"
                        className="bg-red-200 text-red-700 hover:bg-red-300"
                      >
                        Resolve Dispute
                      </Button>
                    )}

                    <DialogSubmitWork
                      job={jobId}
                      open={submit}
                      setOpen={setSubmit}
                    />

                    <Button
                      onClick={() => {
                        dispatch(setSelectedUser(application?.job?.owner));
                        navigate("/message");
                      }}
                      variant="outline"
                    >
                      Message
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-7xl w-full mx-auto bg-white shadow-lg rounded-lg p-4">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead>Job Title</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {freelancersJobs.map((application) => (
                    <TableRow key={application?._id}>
                      <TableCell>{application?.job.title}</TableCell>
                      <TableCell>
                        <Avatar className="w-8 h-8 mr-2 pt-5  inline-block">
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        {application?.job?.owner?.fullName}
                      </TableCell>
                      <TableCell>
                        <Badge className={` px-3 py-1 rounded-full`}>
                          {application?.job.status}
                        </Badge>
                      </TableCell>
                      <TableCell> ${application?.job?.salary}</TableCell>
                      <TableCell>
                        <Button
                          className={`px-4 ${
                            application?.job.status === "active"
                              ? "bg-blue-500"
                              : "bg-red-600"
                          } text-white`}
                        >
                          Submit
                        </Button>
                        <Button variant="outline" className="ml-2">
                          Message
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
      <FreelancersFooter />
    </div>
  );
};

export default MyProjects;
