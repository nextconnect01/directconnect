import { setHiringAssistants } from '@/redux/authSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllHiringAssistant = () => {
    const dispatch = useDispatch()
    const backendUri = import.meta.env.VITE_BACKEND_URL;
    useEffect(() => {
        const fetchAllHiringAssistant = async() => {
            try {
                const res = await axios.get(`${backendUri}/api/v1/user/getHiringAssistants`,{withCredentials : true})
                if(res.data.success){
                    dispatch(setHiringAssistants(res.data.hiringAssistants))
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchAllHiringAssistant()
    },[dispatch])
  
}

export default useGetAllHiringAssistant