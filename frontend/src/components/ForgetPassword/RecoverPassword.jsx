import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";

const RecoverPassword = () => {
  const params = useParams();
  const id = params.id; // Token from the URL params
  const [input, setInput] = useState({
    password: "",
  });

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "/api/v1/user/recover-password",
        { password: input.password }, // Send plain JSON
        {
          headers: {
            Authorization: `Bearer ${id}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during password recovery:", error);
      toast.error(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="w-full bg-slate-300 flex justify-center h-screen items-center">
      <div className="border-2 bg-white flex flex-col gap-7 px-5 py-5">
        <h1 className="text-2xl font-bold">Set A New Password</h1>
        <form onSubmit={submitHandler}>
          <div className="flex flex-col items-start gap-4 w-96">
            <Label>New Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password} // Fixed value binding
              onChange={changeEventHandler}
              placeholder="Enter the new password"
            />
            <Button type="submit">Change Password</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecoverPassword;
