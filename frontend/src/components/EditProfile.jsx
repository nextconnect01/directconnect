import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Edit2 } from "lucide-react";
import UpdatePhotoDialouge from "./UpdatePhotoDialouge";
import { useSelector } from "react-redux";
import UpdateProfileDialouge from "./UpdateProfileDialouge";
import UpdateProfileBio from "./UpdateProfileBio";
import UpdateResumeDialouge from "./UpdateResumeDialouge";
import UpdateGooglePassword from "./UpdateGooglePassword";
import UpdateChangePassword from "./UpdateChangePassword";

const EditProfile = () => {
  const [openResume, setOpenResume] = useState(false);
  const [openPhoto, setOpenPhoto] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openBio, setOpenBio] = useState(false);
  const [googlePassword,setGooglePassword] = useState(false)
  const [resetPassword,setResetPassword] = useState(false)
  const { user } = useSelector((store) => store.auth);

  const calculateProgress = () => {
    let progress = 0;

    if (user?.profilePhoto) progress += 25;
    if (user?.resume) progress += 25;
    if (user?.bio) progress += 25;
    if (
      user?.fullName ||
      user?.email ||
      user?.languages?.length > 0 ||
      user?.professionalTitle
    ) {
      progress += 25;
    }

    return progress;
  };

  const progress = calculateProgress();

  useEffect(() => {
    console.log("Updated user:", user);
  }, [user]);

  const renderIcon = (condition) => {
    return condition ? (
      <span className="text-green-500">✔</span>
    ) : (
      <span className="text-red-500">✖</span>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5 p-5  bg-slate-200">
      <div className="w-full lg:w-2/3 shadow-lg flex flex-col gap-5 border-2 px-5 py-5 rounded-xl bg-white">
        {/* Profile Section */}
        <div className="flex justify-between p-5 gap-14">
          <img
            className="w-20 rounded-full"
            src={user?.profilePhoto || "default-placeholder-image.jpg"}
            alt="Profile"
          />
          <Button
            className="bg-blue-500 text-white"
            variant="outline"
            onClick={() => setOpenPhoto(true)}
          >
            <Edit2 /> Edit Profile
          </Button>
        </div>
        <UpdatePhotoDialouge openPhoto={openPhoto} setOpenPhoto={setOpenPhoto} />

        {/* Personal Info */}
        <div className="mx-3 my-5 px-5 py-5 border-2 rounded-xl flex flex-col ">
          <div className="flex mx-3 p-2 justify-between">
            <h1 className="font-bold">Personal Info</h1>
            <Button
              className="bg-gray-800 text-white"
              onClick={() => setOpenProfile(true)}
              variant="outline"
            >
              <Edit2 /> Edit
            </Button>
          </div>
          <div className="flex mt-5 justify-between px-5">
            <div>
              <h1 className="text-slate-400 text-sm">Full Name</h1>
              <h1>{user?.fullName || "Not specified"}</h1>
            </div>
            <div>
              <h1 className="text-slate-400 text-sm">Email</h1>
              <h1>{user?.email || "Not specified"}</h1>
            </div>
            <div>
              <h1 className="text-slate-400 text-sm">Languages</h1>
              <h1>{user?.languages?.join(", ") || "Not specified"}</h1>
            </div>
            <div>
              <h1 className="text-slate-400 text-sm">Professional Title</h1>
              <h1>{user?.professionalTitle || "Not specified"}</h1>
            </div>
          </div>
          <UpdateProfileDialouge
            openProfile={openProfile}
            setOpenProfile={setOpenProfile}
          />
        </div>

        {/* Bio */}
        <div className="mx-3 my-5 px-10 py-5 flex flex-col border-2 rounded-xl ">
          <div className="flex justify-between">
            <h1 className="font-bold">Bio</h1>
            <Button
              className="bg-blue-500 text-white"
              onClick={() => setOpenBio(true)}
              variant="outline"
            >
              <Edit2 />
              Edit
            </Button>
          </div>
          <div>
            <p>{user?.bio || "No bio added yet"}</p>
          </div>
          <UpdateProfileBio openBio={openBio} setOpenBio={setOpenBio} />
        </div>

        {/* Resume */}
        <div className="border-2 rounded-xl my-5 py-5 mx-3 ">
          <div className="flex justify-between p-5 gap-14 ">
            <a className="underline text-blue-500" href={user?.resume} target="_blank" rel="noopener noreferrer">
              {user?.resumeOriginalName
                ? user.resumeOriginalName.split(".").slice(0, -1).join(".")
                : "Resume Not Uploaded"}
            </a>
            <Button
              className="bg-gray-800 text-white"
              variant="outline"
              onClick={() => setOpenResume(true)}
            >
              <Edit2 /> Upload Resume
            </Button>
          </div>
          <UpdateResumeDialouge
            openResume={openResume}
            setOpenResume={setOpenResume}
          />
        </div>
        {/* Password Section */}
{/* Password Section */}
<div className="border-2 rounded-xl mx-3 my-5">
  <div className="flex flex-col p-5 gap-4">
    <h1 className="font-bold text-lg">Password</h1>
    {user?.isGoogleUser ? (
      !user?.hasPassword ? (
        // Google user without a password
        <div>
          <p className="text-gray-600">
            You are logged in with Google. Set a password for additional login options:
          </p>
          <Button
            className="bg-blue-500 text-white"
            variant="outline"
            onClick={() => setGooglePassword(true)}
          >
            Set Password
          </Button>
          <UpdateGooglePassword
           googlePassword = {googlePassword}
           setGooglePassword = {setGooglePassword}
          />
        </div>
      ) : (
        // Google user with a password
        <div>
          <p className="text-gray-600">You can change your password here:</p>
          <Button
            className="bg-blue-500 text-white"
            variant="outline"
            onClick={() => setResetPassword(true)}
          >
            Change Password
          </Button>
          <UpdateChangePassword
           resetPassword = {resetPassword}
           setResetPassword = {setResetPassword}
          />
        </div>
      )
    ) : (
      // JWT-based user
      <div>
          <p className="text-gray-600">You can change your password here:</p>
          <Button
            className="bg-blue-500 text-white"
            variant="outline"
            onClick={() => setResetPassword(true)}
          >
            Change Password
          </Button>
          <UpdateChangePassword
           resetPassword = {resetPassword}
           setResetPassword = {setResetPassword}
          />
        </div>
    )}
  </div>
</div>


      </div>

      {/* Progress Tracker */}
      {/* Progress Tracker */}
<div className="w-full  lg:w-1/4 h-3/4 py-20  bg-white  max-h-md border-2 rounded-xl shadow-lg p-5 flex flex-col items-center gap-5">
  <h2 className="font-bold text-lg text-center">Complete your profile</h2>
  <div className="relative w-32 h-32">
    <svg
      className="absolute inset-0 transform -rotate-90"
      viewBox="0 0 36 36"
    >
      <circle
        className="text-gray-200"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
        cx="18"
        cy="18"
        r="15.9155"
      />
      <circle
        className="text-green-500"
        stroke="currentColor"
        strokeWidth="4"
        strokeDasharray={`${progress}, 100`}
        strokeDashoffset="0"
        fill="none"
        cx="18"
        cy="18"
        r="15.9155"
      />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="font-bold text-xl text-gray-800">{progress}%</span>
    </div>
  </div>
  <ul className="text-lg w-full flex flex-col gap-4">
    <li className="flex items-center justify-between">
      <span>Profile Photo</span>
      {renderIcon(user?.profilePhoto)}
    </li>
    <li className="flex items-center justify-between">
      <span>Resume</span>
      {renderIcon(user?.resume)}
    </li>
    <li className="flex items-center justify-between">
      <span>Bio</span>
      {renderIcon(user?.bio)}
    </li>
    <li className="flex items-center justify-between">
      <span>Personal Info</span>
      {renderIcon(
        user?.fullName || user?.email || user?.languages?.length > 0 || user?.professionalTitle
      )}
    </li>
  </ul>
</div>

    </div>
  );
};

export default EditProfile;
