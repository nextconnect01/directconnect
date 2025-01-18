import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { Button } from "./ui/button";

const UpdateProfileDialouge = ({ openProfile, setOpenProfile }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullName: "",
    email: "",
    languages: "",
    professionalTitle: "",
  });

  useEffect(() => {
    if (user) {
      setInput({
        fullName: user.fullName || "",
        email: user.email || "",
        languages: user.languages || "",
        professionalTitle: user.professionalTitle || "",
      });
    }
  }, [user]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    console.log("Updated Input:", { ...input, [e.target.name]: e.target.value }); // Debugging log
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("languages", input.languages);
    formData.append("professionalTitle", input.professionalTitle);

    console.log("FormData before API call:", Object.fromEntries(formData)); // Debugging log

    try {
      const res = await axios.post("/api/v1/user/updateProfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      console.log("API Response:", res.data); // Debugging log
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpenProfile(false);
      } else {
        console.error("Unexpected API Response:", res.data);
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div>
      <Dialog open={openProfile}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpenProfile(false)}
        >
          <DialogHeader>
            <DialogTitle>Edit Personal Profile</DialogTitle>
            <DialogDescription>Edit Personal Profile</DialogDescription>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="professionalTitle" className="text-right">
                  Professional Title
                </Label>
                <Input
                  id="professionalTitle"
                  name="professionalTitle"
                  type="text"
                  value={input.professionalTitle}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fullName" className="text-right">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={input.fullName}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="languages" className="text-right">
                  Languages
                </Label>
                <Input
                  id="languages"
                  name="languages"
                  type="text"
                  value={input.languages}
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

export default UpdateProfileDialouge;
