import { setAllApplicants } from "@/redux/applicationSlice";
import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllApplicants = () => {
  const { selectedJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const backendUri = import.meta.env.VITE_BACKEND_URL;
  const fetchAllApplicants = useCallback(async () => {
    try {
      const res = await axios.get(
        `${backendUri}/api/v1/application/getApplicants/${selectedJob?._id}`
      );
      if (res.data.success) {
        dispatch(setAllApplicants(res.data.job?.application));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);
  fetchAllApplicants();

  useEffect(() => {
    fetchAllApplicants();
  }, [fetchAllApplicants]);

  return { refetchApplicant: fetchAllApplicants };
};

export default useGetAllApplicants;
