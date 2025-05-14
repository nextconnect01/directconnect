import { setJobs } from '@/redux/jobSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const backendUri = import.meta.env.VITE_BACKEND_URL;

  const fetchAllJobs = useCallback(async () => {
    try {
      const res = await axios.get(`${backendUri}/api/v1/job/getAllJobs`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setJobs(res.data.jobs));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, backendUri]);

  useEffect(() => {
    fetchAllJobs();
  }, [fetchAllJobs]);

  return { refetchJobs: fetchAllJobs }; // ✅ Return refetch function
};

export default useGetAllJobs;
