import { setAllJobs } from '@/redux/jobSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner';

const useNewAllJobs = () => {
  const dispatch = useDispatch()
  const backendUri = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const fetchAllNewJobs =  async () => {
        try {
            const res = await axios.get(`${backendUri}/api/v1/job/newAllJobs`)
            if(res.data.success){
                dispatch(setAllJobs(res.data.jobs))
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            
        }
    }
    fetchAllNewJobs()
  },[dispatch])
}

export default useNewAllJobs