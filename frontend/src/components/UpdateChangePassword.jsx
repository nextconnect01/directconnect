import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

const UpdateChangePassword = ({ resetPassword, setResetPassword }) => {
  const backendUri = import.meta.env.VITE_BACKEND_URL;

  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    password: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("password", input.password);

    try {
      const res = await axios.post(`${backendUri}/api/v1/user/changePassword`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        console.log("everything is ok api success");

        dispatch(setUser(res.data.user) );
        toast.success(res.data.message);
        setResetPassword(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Dialog open={resetPassword}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setResetPassword(false)}
        >
          <DialogHeader>
            <DialogTitle>Set Password</DialogTitle>
            <DialogDescription>Set Your Password Here</DialogDescription>
          </DialogHeader>
          <form action="" onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newPassword" className="text-right">
                  Change Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={input.password}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="submit">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateChangePassword;
