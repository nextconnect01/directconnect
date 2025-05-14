import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { updateFreelancersJob } from "@/redux/jobSlice";

const DialogSubmitWork = ({ open, setOpen, job }) => {
  const backendUri = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch();
  const submitHandler = async () => {
    try {
      console.log("jobId", job);

      const res = await axios.put(
        `${backendUri}/api/v1/job/${job}/completeJob`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(updateFreelancersJob(res.data.job));
        console.log("Updated Job in Redux:", res.data.job);

        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center mb-7">
            Are you absolutely sure?
          </DialogTitle>
          <div className="flex justify-around gap-5 w-full mt-10">
            <Button
              onClick={submitHandler}
              variant="outline"
              className="bg-blue-700 w-[150px] text-white hover:bg-blue-800 hover:text-white"
            >
              Yes
            </Button>
            <Button
              onClick={() => setOpen(false)}
              className="w-[150px]"
              variant="outline"
            >
              No
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogSubmitWork;
