import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'

const AcceptProposedJob = ({open,setOpen,messageId}) => {
    const [loading,setLoading] = useState(false)
    const backendUri = import.meta.env.VITE_BACKEND_URL;
    const dispatch = useDispatch()
    const acceptProposal = async() => {
        try {
          console.log("jobId",messageId);
          
            const res = await axios.get(`${backendUri}/api/v1/job/confirmProposedJob/${messageId}`,{withCredentials:true})
            if(res.data.success){

                toast.success(res.data.message)
                
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            
        }
    }
  return (
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure? You Want To Accept This Proposal.</DialogTitle>
      <div className='flex justify-center gap-10 pt-7'>
        <Button onClick={acceptProposal} variant="outline" className="w-[150px] bg-blue-600 text-white hover:bg-blue-700 hover:text-white">Yes</Button>
        <Button onClick={() => setOpen(false)} variant="outline" className="w-[150px] bg-red-600 text-white hover:bg-red-700 hover:text-white">No</Button>

      </div>
    </DialogHeader>
  </DialogContent>
</Dialog>
  )
}

export default AcceptProposedJob