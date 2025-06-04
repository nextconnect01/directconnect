import React from 'react'
import { Badge } from '../ui/badge'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import useNewAllJobs from '@/hooks/useNewAllJobs'
import { useSelector } from 'react-redux'

const AdminPanel = () => {
    useNewAllJobs()
    const {allJobs} = useSelector(store => store.job)
    const completedJobsCount = allJobs.filter(job => job.status === "completed").length;
    const activeJobs =  allJobs?.length - completedJobsCount
  return (
    <div className='w-full h-full bg-[#FCFCFC]'>
        <div className='flex justify-center pt-7 w-full h-full '>
            <div className='w-full flex justify-center h-full max-w-6xl'>
                <h1 className='font-bold text-3xl'>Admin Panel</h1>
            </div>
        </div>

        <div className='w-full flex justify-center pt-10 '>
            <div className='flex max-w-6xl w-full justify-between gap-5'> 
                 <div className='rounded-lg w-full bg-white shadow-xl p-4 '>
<p className='text-sm'>Total Jobs</p>
<h1 className='font-bold text-xl'>{allJobs?.length}</h1>
                 </div>

                 <div className='rounded-lg w-full bg-white shadow-xl p-4 '>
<p className='text-sm'>Completed Jobs</p>
<h1 className='font-bold text-xl'>{completedJobsCount}</h1>
                 </div>

                 <div className='rounded-lg w-full bg-white shadow-xl p-4 '>
<p className='text-sm'>Active Jobs</p>
<h1 className='font-bold text-xl'>{activeJobs}</h1>
                 </div>
            </div>
        </div>

        <div className='w-full flex justify-center pt-10'>
            <div className='bg-white p-5 w-full max-w-6xl rounded-lg flex flex-col '>
<div className='border-2 p-4 rounded-lg border-gray-200'>
Recent Jobs
</div>

{allJobs.map((jobs) => (<div className='border-2 border-gray-200 p-4 flex justify-between'>
<div className='flex flex-col gap-2'>
    <p className='text-sm font-bold'>{jobs?.title}</p>
    <div className='flex gap-2'>
<p className='text-sm text-slate-600'>{jobs?.owner?.fullName}</p>
<p className='text-sm text-slate-600'>{jobs?.applicationDeadline?.split("T")[0]} </p>

    </div>
    </div>
    <Badge variant="outline"> {jobs?.status}</Badge>
    </div>))}




            </div>
        </div>
    </div>
  )
}

export default AdminPanel