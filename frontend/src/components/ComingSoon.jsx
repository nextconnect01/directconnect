import React from 'react'
import Navbar from './shared/Navbar'
import { Button } from './ui/button'

const Contact = () => {
  return (
    <div className='w-full'>
       <div className="relative h-screen">
        {/* Background Image Section */}
        <div
          className="absolute top-0 left-0 w-full h-[100%] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('images/pexels-minan1398-813269.jpg')",
          }}
        >
          {/* Dimming effect */}
          <div className="absolute inset-0 bg-black opacity-80"></div>

          <div className="relative pt-7 px-7">
            <Navbar />
            <div className="flex justify-center items-center text-center h-screen">
              <h1 className='text-white font-bold text-4xl'>Coming Soon</h1>
            </div>
          </div>
        </div>

        {/* Bottom White Section */}
        
      </div>
    </div>
  )
}

export default Contact