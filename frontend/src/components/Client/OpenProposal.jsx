import React, { useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { IndianRupee, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OpenProposal = ({ open, setOpen, app }) => {
  const backendUri = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const acceptStatus = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${backendUri}/api/v1/application/updateStatus/${app?._id}`,
        { status: "accepted" },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/myJobs");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[900px] max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="border-b-2 border-slate-200 pb-4">
          <h1 className="text-xl font-bold">Proposal Details</h1>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto py-4 px-1 flex-1 space-y-6">
          {/* Cover Letter */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold">Cover Letter</h2>
            <div className="bg-slate-100 rounded-lg p-3">
              <p>{app?.applicant?.[0]?.coverLetter}</p>
            </div>
          </div>

          {/* Approach */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold">Freelancer's Approach</h2>
            <div className="bg-slate-100 rounded-lg p-3">
              <p>{app?.applicant?.[0]?.yourApproach}</p>
            </div>
          </div>

          {/* Proposal Info */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold">Proposal Details</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-100 rounded-lg p-3">
                <p className="font-bold">Bid Amount</p>
                <div className="flex items-center gap-2">
                  <IndianRupee />
                  <p>{app?.applicant?.[0]?.yourBid}</p>
                </div>
              </div>
              <div className="bg-slate-100 rounded-lg p-3">
                <p className="font-bold">Delivery Time</p>
                <p>{app?.applicant?.[0]?.estimatedTimeLine}</p>
              </div>
              <div className="bg-slate-100 rounded-lg p-3">
                <p className="font-bold">Availability</p>
                <p>Immediately</p>
              </div>

              <div className="bg-slate-100 rounded-lg p-3">
                <p className="font-bold">Revisions</p>
                <p>One time unlimited revisions</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-bold">Portfolio Samples</p>
             <a
  className={
    app?.applicant?.[0]?.portfolio
      ? "text-blue-600 cursor-pointer underline"
      : "disabled text-slate-500"
  }
  href={
    app?.applicant?.[0]?.portfolio?.startsWith("http")
      ? app.applicant[0].portfolio
      : ``
  }
  target="_blank"
  rel="noopener noreferrer"
>
  {app?.applicant?.[0]?.portfolio
    ? "Link"
    : "No Portfolio Submitted By The Freelancer"}
</a>

            </div>

            <div className="flex flex-col gap-3">
              <p className="font-bold">Questions For Client</p>
              <div className="bg-slate-100 rounded-lg p-3">
                <p>
                  {app?.applicant?.[0]?.questionsForClient?.trim()
                    ? app.applicant[0].questionsForClient
                    : "No questions asked"}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="font-bold">Payment Delivery Terms</p>
              {app?.applicant?.[0]?.paymentDeliveryTerms?.trim() ? (
                <Badge
                  variant="outline"
                  className="text-blue-600 w-[137px] h-[30px] bg-blue-100"
                >
                  {app.applicant[0].paymentDeliveryTerms}
                </Badge>
              ) : (
                <p className="text-slate-500">
                  No specific payment delivery terms demanded
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="pt-4 border-t-2 border-slate-200">
          {loading ? (
            <Button
              variant="outline"
              className="w-full bg-blue-700 text-white hover:bg-blue-800 hover:text-white"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
            </Button>
          ) : (
            <Button 
            onClick={acceptStatus}
            variant="outline"
            className="w-full bg-blue-700 text-white hover:bg-blue-800 hover:text-white">Accept Application</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OpenProposal;
