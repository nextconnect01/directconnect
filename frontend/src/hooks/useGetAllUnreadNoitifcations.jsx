import { setAllUnreadNotification } from '@/redux/rtnSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllUnreadNoitifcations = () => {
  const dispatch = useDispatch()
  const backendUri = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchUnreadNotifications = async() => {
        try {
            const res = await axios.get(`${backendUri}/api/v1/notification/getUnreadNotifications`,{withCredentials:true})
            if(res.data.success){
                dispatch(setAllUnreadNotification(res.data.notifications))
            }

        } catch (error) {
            console.log(error);
            
        }
    }
    fetchUnreadNotifications()
  },[dispatch])
}

export default useGetAllUnreadNoitifcations