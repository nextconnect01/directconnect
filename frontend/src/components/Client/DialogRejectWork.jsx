import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAdminJobs } from "@/redux/jobSlice";
import { toast } from "sonner";
import axios from "axios";

const DialogRejectWork = ({ open, setOpen }) => {
  
  const navigate = useNavigate()
  const { selectedJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const { adminsJobs } = useSelector((store) => store.job);

  const backendUri = import.meta.env.VITE_BACKEND_URL
  const [input,setInput] = useState("")
  const submitHandler = async () => {
    try {
      const res = await axios.get(
        `${backendUri}/api/v1/job/incompleteWork/${selectedJob?._id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(
          setAdminJobs(
            adminsJobs.map((job) =>
              job._id === res.data.job._id ? res.data.job : job
            )
          )
        );
        toast.success(res.data.message);
        navigate("/myJobs")
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-3">
            Incomplete Means Freelancer Has Not Fulfilled Project Requirements
          </DialogTitle>
          <div className="bg-yellow-200 rounded-lg  text-orange-900 p-3">
            <DialogDescription className="text-orange-600">
              Note : Only Click on Incomplete if the work submitted by the
              freelancer does'nt meet the requirements mentioned in the project
              . If the Work submitted just require minor twaeks then you can
              select on the Resubmit For Improvement
            </DialogDescription>
          </div>

          <div className="w-full flex justify-center pt-3 gap-14">
            <Button onClick={submitHandler} variant="outline" className="bg-blue-700 text-white">
              Incomplete
            </Button>
            <Button onClick={() => setOpen(false) } variant="outline"> Cancel</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogRejectWork;
