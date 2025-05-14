import { setMessagingClients } from '@/redux/authSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllClients = () => {
 const disptach = useDispatch()
 const backendUri = import.meta.env.VITE_BACKEND_URL;
 useEffect(() => {
    const fetchAllClients = async () => {
        try {
            const res = await axios.get(`${backendUri}/api/v1/message/getClientContacts` ,{withCredentials:true})
            if(res.data.success){
                disptach(setMessagingClients(res.data.clients))
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    fetchAllClients()
 } ,[disptach])
}

export default useGetAllClients