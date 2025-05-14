import { setAllApplications } from '@/redux/applicationSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllFreelancersApplication = () => {
  const dispatch = useDispatch()
  const backendUri = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const fetchAllApplications = async() =>{
        try {
            const res = await axios.get(`${backendUri}/api/v1/application/getAppliedJobs`,{withCredentials:true})
            if(res.data.success){
                dispatch(setAllApplications(res.data.applications))
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    fetchAllApplications()
  },[dispatch])

}

export default useGetAllFreelancersApplication