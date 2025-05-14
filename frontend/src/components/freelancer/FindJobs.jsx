import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  Calendar,
  Clock,
  GraduationCap,
  Handshake,
  IndianRupee,
  Package2,
  SeparatorVertical,
  Star,
  TrainFrontTunnel,
  UserPen,
  Users,
  Zap,
} from "lucide-react";
import { Badge } from "../ui/badge";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useDispatch, useSelector } from "react-redux";
import SubmitPopOver from "./SubmitPopOver";
import useGetAllFreelancersApplication from "@/hooks/useGetAllFreelancersApplication";
import useGetAllAcceptedJobs from "@/hooks/useGetAllAcceptedJobs";
import { Input } from "../ui/input";
import { setSelectedJob } from "@/redux/jobSlice";
import useGetAllUnreadNoitifcations from "@/hooks/useGetAllUnreadNoitifcations";
import { useNavigate } from "react-router-dom";
import FreelancersFooter from "./FreelancersFooter";

const FindJobs = () => {
  useGetAllUnreadNoitifcations();
  const { refetchJobs } = useGetAllJobs();

  const { user } = useSelector((store) => store.auth);
  useGetAllFreelancersApplication();
  const [openPopOver, setOpenPopOver] = useState(false);

  const { jobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("any");
  const [selectedKeyword, setSelectedKeyword] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("any");
  const [selectedDuration, setSelectedDuration] = useState("any");
  const [filteredJobs, setFilteredJobs] = useState(jobs || []);
  const [selectedJobId, setSelectedJobId] = useState("");
  const getDaysAgo = (dateString) => {
    if (!dateString) {
      return "Some Time";
    }
    const createdDate = new Date(dateString);
    const now = new Date();

    const diffTime = now - createdDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days ago `;
  };

  const applyHandleFilter = () => {
    const filtered = jobs?.filter((job) => {
      const matchedCategory =
        selectedCategory === "any" ? true : job?.category === selectedCategory;

      const matchedKeyword = selectedKeyword
        ? job?.skills?.some((skill) =>
            skill.toLowerCase().includes(selectedKeyword.toLowerCase())
          )
        : true;

      const matchedBudget =
        selectedBudget === "any"
          ? true
          : (() => {
              const salary = job?.salary || 0;
              if (selectedBudget === "under100") return salary < 100;
              if (selectedBudget === "100to500")
                return salary >= 100 && salary <= 500;
              if (selectedBudget === "500to1000")
                return salary > 500 && salary <= 1000;
              if (selectedBudget === "1000to2000")
                return salary > 1000 && salary <= 2000;
              if (selectedBudget === "over2000") return salary > 2000;
              return true;
            })();

      const matchedDuration =
        selectedDuration === "any" ? true : job?.duration === selectedDuration;

      return (
        matchedCategory && matchedKeyword && matchedBudget && matchedDuration
      );
    });
    setFilteredJobs(filtered);
  };

  const navigate = useNavigate();

  useEffect(() => {
    applyHandleFilter();
  }, [jobs]);

  return (
    <div className="w-full  pt-5">
      <Navbar />
      <div className="w-full pb-5 h-full bg-[#F5F5F5]">
        <div className="w-full flex justify-center">
          <div className="w-full mt-8  max-w-6xl ">
            <h1 className="text-3xl font-bold">Find Jobs</h1>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <div
            className="w-full mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 
  gap-4 bg-white max-w-6xl rounded-lg shadow-2xl p-4 "
          >
            <div className="flex flex-col gap-2">
              <p className="text-sm text-slate-500">Category</p>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">All Categories</SelectItem>
                  <SelectItem value="Web Developement">
                    Web Development
                  </SelectItem>
                  <SelectItem value="Mobile Development">
                    Mobile Development
                  </SelectItem>
                  <SelectItem value="Design & Creative">
                    Design & Creative
                  </SelectItem>
                  <SelectItem value="Writing & Translation">
                    Writing & Translation
                  </SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm text-slate-500">Keywords</p>
              <Input
                value={selectedKeyword}
                onChange={(e) => setSelectedKeyword(e.target.value)}
                className="w-[180px]"
                placeholder="Search Keywords"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm text-slate-500">Budget Range</p>
              <Select value={selectedBudget} onValueChange={setSelectedBudget}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">All Budget</SelectItem>
                  <SelectItem value="under100">Under $100</SelectItem>
                  <SelectItem value="100to500">$100 - $500</SelectItem>
                  <SelectItem value="500to1000">$500 - $1000</SelectItem>
                  <SelectItem value="1000to2000">$1000 - $2000</SelectItem>
                  <SelectItem value="over2000">Over $2000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm text-slate-500">Project Duration</p>
              <Select
                value={selectedDuration}
                onValueChange={setSelectedDuration}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Any Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Duration</SelectItem>
                  <SelectItem value="1-2 weeks">Less Than A Week</SelectItem>
                  <SelectItem value="2-4 weeks">1 - 2 weeks</SelectItem>
                  <SelectItem value="3 - 4 month">3 - 4 weeks</SelectItem>
                  <SelectItem value="1-3 month">1 - 3 month</SelectItem>
                  <SelectItem value="3-6 month">3 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-center items-center">
              <Button
                onClick={applyHandleFilter}
                variant="outline"
                className="bg-blue-700 hover:bg-blue-800 hover:text-white text-white font-bold"
              >
                <SeparatorVertical /> Apply Filters{" "}
              </Button>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center px-2 sm:px-4">
  <div className="flex flex-col lg:flex-row mt-10 w-full max-w-6xl gap-5">
    {/* LEFT COLUMN */}
    <div className="w-full lg:w-3/4">
      {filteredJobs?.map((job) => (
        <div
          key={job?._id}
          className="bg-white transition-transform duration-300 hover:-translate-y-2 p-4 sm:p-5 mt-4 shadow-2xl w-full rounded-lg border-l-4 hover:border-blue-700 cursor-pointer flex flex-col gap-4"
        >
          <h1 className="font-bold text-lg sm:text-xl">{job?.title}</h1>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <p className="text-slate-500 text-sm">{job?.owner?.fullName}</p>
            <div className="flex gap-1 items-center">
              <IndianRupee className="text-blue-600" />
              <h1 className="text-blue-600 text-lg sm:text-xl">
                {job?.salary}
              </h1>
            </div>
          </div>

          <p className="text-slate-600 text-sm sm:text-base">
            {job?.description}
          </p>

          <div className="flex flex-wrap gap-3 text-sm text-slate-700">
            <div className="flex gap-1 items-center">
              <Clock size={"20px"} />
              {job?.applicationDeadline.split("T")[0]}
            </div>
            <div className="flex gap-1 items-center">
              <Star size={"20px"} />
              Rating Required 4+
            </div>
            <div className="flex gap-1 items-center">
              <Package2 size={"20px"} />
              {job?.rank}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {job?.skills?.map((item, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-blue-100 text-blue-600"
              >
                {item}
              </Badge>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <div className="flex gap-3">
              <Button
                disabled={job?.application?.some((app) =>
                  app?.applicant?.some(
                    (person) => person.user === user?._id
                  )
                )}
                onClick={() => {
                  setOpenPopOver(true);
                  dispatch(setSelectedJob(job));
                }}
                variant="outline"
                className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
              >
                Submit Proposal
              </Button>

              <Button variant="outline">Save</Button>
            </div>

            <p className="text-slate-500 text-sm">
              Posted {getDaysAgo(job?.createdAt)}
            </p>
          </div>
        </div>
      ))}

      <SubmitPopOver
        refetchJobs={refetchJobs}
        jobId={selectedJobId}
        open={openPopOver}
        setOpen={setOpenPopOver}
      />
    </div>

    {/* RIGHT COLUMN */}
    <div className="w-full lg:w-1/4 mt-4 flex flex-col gap-10">
      <div className="bg-white rounded-lg shadow-2xl p-4">
        <h1 className="text-lg font-semibold mb-3">Your Profile Overview</h1>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-100 text-center rounded-lg p-4 flex flex-col gap-2">
            <h1 className="text-blue-600 text-lg">
              {user?.proposalsSent?.length}
            </h1>
            <p className="text-slate-700 text-sm">Proposals Sent</p>
          </div>

          <div className="bg-slate-100 rounded-lg p-4 text-center flex flex-col gap-2">
            <h1 className="text-blue-600 text-lg">{user?.activeJob?.length}</h1>
            <p className="text-slate-700 text-sm">Active Projects</p>
          </div>

          <div className="bg-slate-100 p-4 text-center rounded-lg flex flex-col gap-2">
            <h1 className="text-blue-600 text-lg">85 %</h1>
            <p className="text-slate-700 text-sm">Profile Completion</p>
          </div>

          <div className="bg-slate-100 p-4 text-center rounded-lg flex flex-col gap-2">
            <h1 className="text-blue-600 text-lg">6.3</h1>
            <p className="text-slate-700 text-sm">Your Rating</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-2xl mt-4 p-4 flex flex-col gap-4">
        <h1 className="text-lg font-semibold">Recommended Jobs</h1>

        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="flex flex-col border-b-2 pb-4 border-slate-200 gap-1"
          >
            <h1 className="font-medium">Frontend Developer - React Specialist</h1>
            <p className="text-sm text-slate-500">TechFlow Solutions</p>
            <div className="flex justify-between text-sm">
              <p>Posted 1 day ago</p>
              <p className="text-blue-600">$40-60/hr</p>
            </div>
          </div>
        ))}

        <Button variant="outline" className="bg-blue-600 text-white flex items-center gap-2">
          <Zap /> View All Recommendations
        </Button>
      </div>

      <div className="bg-white shadow-2xl p-4 rounded-lg flex flex-col gap-3">
        <h1 className="text-lg font-semibold">Quick Actions</h1>

        <div
          onClick={() => navigate("/editProfile")}
          className="flex cursor-pointer text-slate-800 hover:text-blue-600 gap-2 pb-3 border-b border-slate-200"
        >
          <UserPen />
          <h1>Update Your Profile</h1>
        </div>

        <div
          onClick={() => navigate("/mentorship")}
          className="flex cursor-pointer text-slate-800 hover:text-blue-600 gap-2 pb-3 border-b border-slate-200"
        >
          <Handshake />
          <h1>Join Our Mentorship Program</h1>
        </div>

        <div className="flex cursor-pointer text-slate-800 hover:text-blue-600 gap-2 pb-3 border-b border-slate-200">
          <Users />
          <h1>Join Our Community</h1>
        </div>

        <div className="flex cursor-pointer text-slate-800 hover:text-blue-600 gap-2 pb-3 border-b border-slate-200">
          <GraduationCap />
          <h1>Browse Skill Development Resources</h1>
        </div>
      </div>

      <div className="bg-white shadow-2xl rounded-lg p-4 flex flex-col gap-5">
        <h1 className="text-lg font-semibold">Upcoming Community Events</h1>

        {[1, 2].map((_, i) => (
          <div key={i} className="bg-blue-100 p-3 rounded-lg flex flex-col gap-1">
            <h1 className="text-blue-700 font-medium">
              Freelancing Best Practices Webinar
            </h1>
            <div className="flex items-center gap-1">
              <Calendar />
              <p className="text-xs">Mar 26, 2025 • 2:00 PM</p>
            </div>
            <p className="text-sm">
              Learn expert strategies to stand out and win more high-quality
              projects.
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

      </div>
      <FreelancersFooter/>
    </div>
  );
};

export default FindJobs;
