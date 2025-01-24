import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import GoogleLoginButton from '../shared/GoogleButton'
import axios from 'axios'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import store from '@/redux/store'

const SignUp = () => {
    const backendUri = import.meta.env.VITE_BACKEND_URL;
    const {user,loading} = useSelector(store => store.auth)
   
    const navigate = useNavigate()
    const [input,setInput] = useState({
        fullName : "",
        email : "",
        password : "",
        username : ""
    })

    const changeEventHandler = (e) => {
        setInput({...input,[e.target.name] : e.target.value})
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        console.log(input);
        const formData = new FormData()
        formData.append("fullName" , input.fullName);
        formData.append("email" , input.email);
        formData.append("password" , input.password);
        formData.append("username" , input.username);

        try {
            const res = await axios.post(`${backendUri}/api/v1/user/register`,formData,{
                headers : {
                    "Content-Type" : "application/json"
                },
                withCredentials : true
            })

            if (res.data.success){
                
                
                toast.success(res.data.message)
                console.log(res.data);
                navigate("/login")
                
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
        
        
    }
    
  return (
    <div className=' flex justify-center items-center w-screen h-screen bg-slate-300'>
        <div className='flex px-12 py-12 flex-col gap-14 max-w-xl border-2 bg-white  '>
            <form onSubmit={submitHandler}>
            <h1 className='font-bold text-xl mb-5 text-[#2196F3]'>Account SignUp</h1>
            <div className='flex flex-col text-[#2196F3] gap-5'>
                <div>
                <Label>Email</Label>
                <Input
                 type = "email"
                 placeholder = "Enter Your Email"
                 name = "email"
                 value = {input.email}
                 onChange = {changeEventHandler}
                />
                </div>
                <div>
                <Label>Password</Label>
                <Input
                 type = "password"
                 placeholder = "Enter Your Password"
                 name = "password"
                 value = {input.password}
                 onChange = {changeEventHandler}
                />
                </div>
                <div>
                <Label>Username</Label>
                <Input
                 type = "text"
                 placeholder = "Enter Your username"
                 name = "username"
                 value = {input.username}
                 onChange = {changeEventHandler}
                />
                </div>
                <div>
                <Label>Full Name</Label>
                <Input
                 type = "text"
                 placeholder = "Enter Your Full Name"
                 name = "fullName"
                 value = {input.fullName}
                 onChange = {changeEventHandler}
                />
                </div>
                <div className='flex justify-between gap-12'>
                    <div>
                    <p className='text-sm '>Alread Have an Account</p>
                    <Link to = "/login" className='text-sm  cursor-pointer'>LogIn</Link>
                    {/* <p className='text-sm  cursor-pointer'>LogIn</p> */}
                    </div>
                    
                    <p className='text-sm cursor-pointer'>forget password?</p>
                </div>

               
            </div>
            <div className='flex flex-col gap-5 mt-5'>
                <Button className = "bg-[#2164f3] text-white hover:bg-[#2164f3] hover:text-white" type = "submit" variant= "outline">Sign Up</Button>
                <GoogleLoginButton onClick = {() => navigate("/")}/>
            </div>
            </form>
            
          
            
        </div>
    </div>
  )
}

export default SignUp