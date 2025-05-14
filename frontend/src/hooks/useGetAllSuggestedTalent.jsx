import { setSuggestedFreelancers } from '@/redux/authSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllSuggestedTalent = () => {
    const backendUri = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchSuggestedFreelancers = async () => {
        try {
            const res = await axios.get(`${backendUri}/api/v1/user/suggestedFreelancers`,{withCredentials : true})
            if(res.data.success){
                dispatch(setSuggestedFreelancers(res.data.users))
            }
        } catch (error) {
            console.log(error);
            
        }


    }
    fetchSuggestedFreelancers()
  },[dispatch])
}

export default useGetAllSuggestedTalent