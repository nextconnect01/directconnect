import { setAllNotifications } from '@/redux/rtnSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllNotifications = (refreshTrigger) => {
 
    const dispatch = useDispatch()
    const backendUri = import.meta.env.VITE_BACKEND_URL;
    
    useEffect(() => {
        const fetchAllNotifications =  async() => {
            try {
                const res = await axios.get(`${backendUri}/api/v1/notification/getNotifications`,{withCredentials:true})
                if(res.data.success){
                    dispatch(setAllNotifications(res.data.notifications))
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchAllNotifications()
    },[dispatch,refreshTrigger])
}

export default useGetAllNotifications