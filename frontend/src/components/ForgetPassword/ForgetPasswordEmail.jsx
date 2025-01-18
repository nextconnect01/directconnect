import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const ForgetPasswordEmail = () => {
  const [input, setInput] = useState({
    email: "",
  });
  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", input.email);

    try {
      const res = await axios.post("/api/v1/user/forget-password", formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("request done");
      
      if (res.data.success) {
        console.log("sab sahi");

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen flex flex-col gap-7 justify-center items-center h-screen bg-slate-300">
      <div className=" px-24 flex flex-col gap-7 py-10   border-2 border-gray-400 bg-white  ">
        <h1 className="font-bold text-3xl">Forgot Password ?</h1>
        <p>No worries we will send you reset instructions on your email</p>
        <form action="" onSubmit={submitHandler}>
          <div className="w-1/2 flex flex-col items-start gap-5">
            <Label>Email</Label>
            <Input
              placeholder="Enter Your Email"
              name="email"
              type="email"
              value={input.email}
              onChange={changeEventHandler}
            />
          </div>
          <div className="w-1/3 mt-5">
            <Button variant="outline" className="bg-blue-500 w-/1/3">
              Reset Password
            </Button>
          </div>
        </form>

        <div className="flex gap-5 w-1/3">
          <MoveLeft
            className="cursor-pointer"
            onClick={() => navigate("/login")}
          />{" "}
          Back To Login
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordEmail;
