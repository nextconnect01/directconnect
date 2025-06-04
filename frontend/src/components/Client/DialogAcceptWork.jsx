import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setAdminJobs } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const DialogAcceptWork = ({ open, setOpen }) => {
  const navigate = useNavigate()
  const { selectedJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const { adminsJobs } = useSelector((store) => store.job);

  const backendUri = import.meta.env.VITE_BACKEND_URL
  const submitHandler = async () => {
    try {
      const res = await axios.get(
        `${backendUri}/api/v1/job/acceptWork/${selectedJob?._id}`,
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
          <DialogTitle className="pb-3 text-xl">
            Accepting means work is final and complete.
          </DialogTitle>
          <div className="bg-yellow-200 rounded-lg text-orange-900 p-3">
            <DialogDescription className="text-orange-600">
              Note : Only Click on Accept if you are happy with the full work
              and do not need any revisions as once it is accepted the payment
              will be released to the freelancer
            </DialogDescription>
          </div>

          <div className="w-full pt-3 flex justify-center gap-14">
            <Button onClick={submitHandler} variant="outline" className="bg-blue-700 text-white ">
              Accept Work
            </Button>
            <Button onClick={() => setOpen(false)} variant="outline">
              Cancel
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAcceptWork;
