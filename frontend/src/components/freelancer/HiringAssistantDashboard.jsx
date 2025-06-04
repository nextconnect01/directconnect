import React from 'react'
import Navbar from '../shared/Navbar'
import { Users } from 'lucide-react'

const HiringAssistantDashboard = () => {
  return (
    <div className ="w-full h-full pt-3">
      <Navbar/>
      <div className='w-full h-full bg-[#fcfcfc] '>
        <div className='w-full flex justify-center '>
          <div className='w-full max-w-7xl mt-10'>
            <h1 className='font-bold text-2xl '>Hiring Assistant Dashboard</h1>
          </div>

          
        </div>

        <div className='w-full mt-7 flex justify-center'>
          <div className='w-full max-w-7xl  bg-white rounded-lg shadow-xl px-25 py-5 flex flex-col justify-center items-center gap-3'>
            <h1 className='font-bold text-xl'>
              Welcome to Your Hiring Assistant Dashboard
            </h1>
            <p className='text-sm'>You're now a Hiring Assistant! This dashboard will display your client cards once clients appoint you to help them find the right talent.
</p>

<div className='bg-slate-50 w-[700px] rounded-lg shadow-md flex flex-col gap-2 p-4'>
<div className='flex gap-2 font-bold justify-center text-blue-900 '>
<Users/>
<p>What to Expect as a Hiring Assistant
</p>
</div>

<div className='flex gap-2'>
<div className='rounded-full h-[27px] w-[27px] flex justify-center items-center bg-blue-800 p-3 text-white'>
1
</div>
<div className='flex flex-col gap-2'>
<p className='font-bold text-sm'>Client Discovery</p>
<p className='text-sm'>Clients can discover and appoint you through the Hiring Assistant directory based on your expertise and experience.
</p>
</div>
</div>

<div className='flex gap-2'>
<div className='rounded-full h-[27px] w-[27px] flex justify-center items-center bg-blue-800 p-3 text-white'>
2
</div>
<div className='flex flex-col gap-2'>
<p className='font-bold text-sm'>Client Appointment
</p>
<p className='text-sm'>When a client selects you, you'll receive a notification and their card will appear
on this dashboard.
</p>
</div>
</div>

<div className='flex gap-2'>
<div className='rounded-full h-[27px] w-[27px] flex justify-center items-center bg-blue-800 p-3 text-white'>
3
</div>
<div className='flex flex-col gap-2'>
<p className='font-bold text-sm'>Job Management Candidates
</p>
<p className='text-sm'>Post jobs on behalf of your clients and review applications to shortlist the best

</p>
</div>
</div>

<div className='flex gap-2'>
<div className='rounded-full h-[27px] w-[27px] flex justify-center items-center bg-blue-800 p-3 text-white'>
4
</div>
<div className='flex flex-col gap-2'>
<p className='font-bold text-sm'>Earn Commission</p>
<p className='text-sm'>Receive commission payments when clients successfully hire freelancers based
on your recommendations.
</p>
</div>
</div>
</div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default HiringAssistantDashboard