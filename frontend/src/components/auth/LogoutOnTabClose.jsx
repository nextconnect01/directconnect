import { setUser } from '@/redux/authSlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const LogoutOnTabClose = () => {
    const backendUri = import.meta.env.VITE_BACKEND_URL
    const dispatch =  useDispatch()
    useEffect(() => {
        const handleBeforeUnload = () => {
            dispatch(setUser(null))
            navigator.sendBeacon(`${backendUri}/api/v1/user/logout`)
        }

        window.addEventListener("beforeunload",handleBeforeUnload)
        return () => {
            window.removeEventListener("beforeunload",handleBeforeUnload)
        }
    },[backendUri,dispatch])
  return null
}

export default LogoutOnTabClose