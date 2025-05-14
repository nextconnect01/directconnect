import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { toast } from 'sonner'
import axios from 'axios'

const ClientFooter = () => {
    const backendUri = import.meta.env.VITE_BACKEND_URL
    const [email,setEmail] = useState("")
    const submitHandler = async() => {
        try {
            const res = await axios.post(`${backendUri}/api/v1/user/userToUpdate` ,{email},{withCredentials:true})
            if(res.data.success){
                toast.success(res.data.message)
                setEmail("")
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            
        }
    }
  return (
    <div className='w-full border-t-2 border-slate-400  bg-[#F5F5F5] '>
        <div className='p-10 grid grid-cols-1 lg:grid-cols-4 gap-4 w-full pb-7 border-b-2 border-slate-400'>
            <div className='flex flex-col gap-5'>
                <h1 className='underline text-blue-600 font-bold text-xl'>
                    NEXT CONNECT
                </h1>
                <p>The platform that revolutionizes freelance collaboration by connecting clients and freelancers directly without commission fees.
</p>
<div className='flex gap-2'>
    <div className='bg-slate-400 rounded-full p-3 hover:bg-blue-600 cursor-pointer hover:text-white'>
    <Facebook />
    </div>

    <div className='bg-slate-400 rounded-full p-3 hover:bg-blue-600 cursor-pointer hover:text-white'>
    <Twitter />
    </div>

    <div className='bg-slate-400 rounded-full p-3 hover:bg-blue-600 cursor-pointer hover:text-white'>
    <Linkedin />
    </div>

    <div className='bg-slate-400 rounded-full p-3 hover:bg-blue-600 cursor-pointer hover:text-white'>
    <Instagram />
    </div>
</div>
            </div>

            <div className='flex flex-col gap-7'>
                <h1 className='text-blue-600 font-bold text-xl'>For Clients</h1>
                <div className='flex flex-col gap-4 text-slate-600 text-sm '>
                <p className='hover:text-blue-600 cursor-pointer'>How It Works</p>
                <p className='hover:text-blue-600 cursor-pointer'>Post A Project </p>
                <p className='hover:text-blue-600 cursor-pointer'>Browse Freelancers</p>
                <p className='hover:text-blue-600 cursor-pointer'>AI Powered Job Creation</p>
                <p className='hover:text-blue-600 cursor-pointer'>Hiring Assistants</p>
                </div>
                
            </div>

            

            <div className='flex flex-col gap-7'>
                <h1 className='text-blue-600 font-bold text-xl'>Resource</h1>

                <div className='flex flex-col gap-4 text-sm text-slate-600'>
                <p className='hover:text-blue-600 cursor-pointer'>Community</p>
                <p className='hover:text-blue-600 cursor-pointer'>Success Stories </p>
                <p className='hover:text-blue-600 cursor-pointer'>Client Review</p>
                <p className='hover:text-blue-600 cursor-pointer'>Help Center</p>
                <p className='hover:text-blue-600 cursor-pointer'>Blog</p>
                </div>
               
            </div>

            <div className='flex flex-col gap-7'>
                <h1 className='text-blue-600 text-xl font-bold'>Stay Connected</h1>
                <div className='flex flex-col gap-4'>
                    <p>Get notified about new features, events and opportunities.

</p>
<div className='flex gap-2'>
    <Input value={email} onChange = {(e) => setEmail(e.target.value)} className="bg-white" placeholder ="Your Email Address"/>
    <Button onClick = {submitHandler} variant="outline">Subscribe</Button>
</div>
<p className='text-xs text-slate-600'>We respect your privacy. Unsubscribe at any time.

</p>
<div className='flex flex-col gap-2'>
    <Badge variant="outline" className="rounded-full w-fit bg-blue-600 text-white ">No Commission Fees </Badge>
    <Badge variant="outline" className="rounded-full w-fit bg-blue-600 text-white ">No Commission Fees </Badge>

</div>
                </div>
                
            </div>

        </div>

        <div className='flex justify-center gap-4 pt-5'>
            <p className='text-sm text-slate-600 hover:text-blue-600 cursor-pointer'>Terms Of Service</p>
            <p className='text-sm text-slate-600 hover:text-blue-600 cursor-pointer'>Privacy Policy</p>
            <p className='text-sm text-slate-600 hover:text-blue-600 cursor-pointer'>User Agreement</p>
            <p className='text-sm text-slate-600 hover:text-blue-600 cursor-pointer'>Cookie Policy</p>
            <p className='text-sm text-slate-600 hover:text-blue-600 cursor-pointer'>About Us</p>
            <p className='text-sm text-slate-600 hover:text-blue-600 cursor-pointer'>Contact Us</p>


        </div>
        <div className='flex justify-center pt-5 pb-10'>
<p className='text-xs'>© 2025 Next Connect. All rights reserved.</p>
        </div>
        
    </div>
  )
}

export default ClientFooter