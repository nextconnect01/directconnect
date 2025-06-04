import React, {  useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import GoogleLoginButton from "../shared/GoogleButton";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const backendUri = import.meta.env.VITE_BACKEND_URL;

  const {user , loading} = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const clearInputs = () => {
    setInput({ email: "", password: "" });
  };



  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    dispatch(setLoading(true));
    const formData = new FormData();

    formData.append("email", input.email);
    formData.append("password", input.password);

    try {
      const res = await axios.post( `${backendUri}/api/v1/user/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user))
        toast.success(res.data.message);
        console.log(res.data);
        if (res.data.user?.role === "freelancer") {
          navigate("/freelancersHome");
        } else if (res.data.user?.role === "client") {
          navigate("/client-dashboard");
        } 
        else if(res.data.user.role === "admin"){
          navigate("/adminPanel")
        }
        else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false))
    }
  };

  return (
    <div className=" flex justify-center items-center w-screen h-screen bg-slate-300">
      <div className="flex px-12 py-12 shadow-xl rounded-xl flex-col gap-14 max-w-xl border-2 bg-white  ">
        <form onSubmit={submitHandler}>
          <h1 className="font-bold text-xl mb-5 text-black">
            Account Login
          </h1>
          <div className="flex flex-col text-black gap-5">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter Your Email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter Your Password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
              />
            </div>

            <div className="flex justify-between gap-12">
              <div className="flex flex-col">
                <Link to = "/signUp" className='text-sm  cursor-pointer'>Don't Have An</Link>
                <Link to = "/signUp" className='text-sm  cursor-pointer'>Account SignUp</Link>
              </div>

              <p onClick={() => navigate("/forget-password")} className="text-sm cursor-pointer">Forget Password?</p>
            </div>
          </div>
          <div className="flex flex-col gap-5 mt-5">
          {loading ? (
              <Button
                className="bg-white text-black shadow-md hover:bg-blue-500 hover:text-white   text-xl py-5"
                type="submit"
                variant="outline"
              >
                {" "}
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
              </Button>
            ) : (
              <Button
                className="bg-white text-black shadow-md hover:bg-blue-500 hover:text-white   text-xl py-5"
                type="submit"
                variant="outline"
              >
                Login
              </Button>
            )}
            <GoogleLoginButton clearInputs={clearInputs}  onClick = {() => navigate("/find-jobs")}  />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
