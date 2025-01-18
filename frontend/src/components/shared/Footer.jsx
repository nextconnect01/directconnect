import React from 'react'
import { Button } from '../ui/button'

const Footer = () => {
  return (
    <div>
        <div className="mt-20 relative h-[50vh]">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('images/homeLast.jpg')",
          }}
        >
          {/* Dimming effect */}
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="relative z-10 flex justify-center items-center h-full">
            <div className="flex flex-col gap-10 items-center">
              <h1
                className="text-[#FCFCFC] text-6xl font-bold text-center"
                style={{
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)",
                }}
              >
                Join Our Community Today
              </h1>
              <h3
                className="text-[#FCFCFC] text-xl font-bold text-center"
                style={{
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)",
                }}
              >
                Sign up now to revolutionise your freelance experience and
                connect with clients directly without any commission fees.
              </h3>
              <Button className=" bg-[#2164f3] hover:bg-white hover:text-black">
                Learn More
              </Button>
            </div>
            
          </div>
          <p className="text-center text-[#607D8B] mt-5">Copyright © 2024 Direct-connect-new</p>
        </div>
      </div>
    </div>
  )
}

export default Footer