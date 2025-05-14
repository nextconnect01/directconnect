import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import axios from 'axios'

const RejectApplicationStatus = ({open,setOpen,applicationId,refetchApplicant}) => {
    const [status,setStatus] = useState("")
    const backendUri = import.meta.env.VITE_BACKEND_URL;

    const updateStatus = async (newStatus) => {
        try {
            console.log("applicationId",applicationId);
            
            const res = await axios.post(`${backendUri}/api/v1/application/updateStatus/${applicationId}`,{status:newStatus},{withCredentials:true})
            console.log("Step2");
            
            if(res.data.success){
                toast.success(res.data.message)
                refetchApplicant()
            }
            console.log("Step3");
            
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className ="text-center">Are you absolutely sure?</DialogTitle>
      <DialogDescription className ="text-center">
        This action cannot be undone. 
      </DialogDescription>
      <div className='w-full flex justify-around pt-5'>
        <Button onClick={() => {updateStatus("rejected"); setOpen(false)}} variant ="outline" className="bg-blue-700 w-[200px] text-white hover:bg-blue-800 hover:text-white">Yes</Button>
        <Button onClick = {() => setOpen(false)} variant ="outline" className="bg-red-700 w-[200px] text-white hover:bg-red-800 hover:text-white">No</Button>

      </div>
    </DialogHeader>
  </DialogContent>
</Dialog>

  )
}

export default RejectApplicationStatus