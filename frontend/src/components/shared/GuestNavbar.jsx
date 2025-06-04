import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

const GuestNavbar = () => {
    const {user} = useSelector(store => store.auth)
    const navigate = useNavigate()

  return (
    <div className="flex justify-between text-white ">
          <div className="flex justify-center items-center gap-2">
            <img
              src="/images/logoFinal.png"
              alt="imagess"
              className="max-w-14 rounded-lg object-cover"
            />
            <h1 className="text-xl font-bold">Next Connect</h1>
          </div>
          <div className="flex text-lg mt-[10px] gap-5">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/offering">Offerings</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/coming-soon">Coming Soon</Link>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => navigate("/SignUp")}
              className="bg-[#FCFCFC] text-black hover:bg-[#FCFCFC] hover:text-black"
            >
              Sign Up
            </Button>
            <Button
              onClick={() => navigate("/login")}
              className="bg-[#2164f3] text-[#FCFCFC] hover:bg-[hsl(221,64%,36%)] hover:text-white"
            >
              Login
            </Button>
          </div>
        </div>
  )
}

export default GuestNavbar