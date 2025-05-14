import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import GoogleLoginButton from "../shared/GoogleButton";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { Loader2 } from "lucide-react";
import { setLoading, setUser } from "@/redux/authSlice";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const SignUp = () => {
  const dispatch = useDispatch();
  const backendUri = import.meta.env.VITE_BACKEND_URL;
  const { user, loading } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    username: "",
    role : ""
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("username", input.username);
    formData.append("role" , input.role)

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${backendUri}/api/v1/user/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(
          "Account created successfully! Please check your email to verify your account."
        );
        console.log(res.data);
        // navigate("/login")
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className=" flex justify-center items-center w-screen h-screen bg-slate-300">
      <div className="flex px-12 shadow-xl rounded-xl py-12 flex-col gap-14 max-w-5xl w-[350px] border-2 bg-white  ">
        <form onSubmit={submitHandler}>
          <h1 className="font-bold text-xl mb-5 text-black">Account SignUp</h1>
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
            <div>
              <Label>Username</Label>
              <Input
                type="text"
                placeholder="Enter Your username"
                name="username"
                value={input.username}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Full Name</Label>
              <Input
                type="text"
                placeholder="Enter Your Full Name"
                name="fullName"
                value={input.fullName}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Role</Label>
              <Select 
               name="role"
               onValueChange={(value) => setInput({...input,role : value})}
               value={input.role}
              >
                <SelectTrigger className="w-[250px]">
                  <SelectValue  placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="freelancer">Freelancer</SelectItem>
                  <SelectItem value="client">Client</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between gap-12">
              <div className="flex flex-col">
                <Link to="/login" className="text-sm  cursor-pointer">
                  Alread Have an
                </Link>
                <Link to="/login" className="text-sm  cursor-pointer">
                  {" "}
                  Account LogIn
                </Link>
                {/* <p className='text-sm  cursor-pointer'>LogIn</p> */}
              </div>

              <p className="text-sm cursor-pointer">forget password?</p>
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
                Sign Up
              </Button>
            )}

            <GoogleLoginButton onClick={() => navigate("/")} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
