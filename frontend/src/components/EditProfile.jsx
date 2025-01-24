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
  const [googlePassword, setGooglePassword] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
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
    <div className="flex flex-col lg:flex-row gap-5 p-5 bg-slate-200">
      <div className="w-full lg:w-2/3 shadow-lg flex flex-col border-2 px-5 py-5 rounded-3xl bg-slate-50">
        <div className="flex flex-col md:flex-row justify-between items-center p-5 gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <img
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
              src={user?.profilePhoto || "default-placeholder-image.jpg"}
              alt="Profile"
            />
            <p className="text-sm text-gray-600">
              At least 800*800 px recommended
              <br />
              JPG or PNG is allowed
            </p>
          </div>
          <Button
            className="bg-blue-500 text-white"
            variant="outline"
            onClick={() => setOpenPhoto(true)}
          >
            <Edit2 /> Edit Profile
          </Button>
        </div>
        <UpdatePhotoDialouge
          openPhoto={openPhoto}
          setOpenPhoto={setOpenPhoto}
        />

        <div className="mx-3 my-5 px-5 py-5 border-2 rounded-xl flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="font-bold text-xl">Personal Info</h1>
            <Button
              className="bg-gray-800 text-white"
              onClick={() => setOpenProfile(true)}
              variant="outline"
            >
              <Edit2 /> Edit
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
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

        <div className="mx-3 my-5 px-5 py-5 flex flex-col border-2 rounded-xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="font-bold">Bio</h1>
            <Button
              className="bg-blue-500 text-white"
              onClick={() => setOpenBio(true)}
              variant="outline"
            >
              <Edit2 /> Edit
            </Button>
          </div>
          <div className="mt-3">
            <p>{user?.bio || "No bio added yet"}</p>
          </div>
          <UpdateProfileBio openBio={openBio} setOpenBio={setOpenBio} />
        </div>

        <div className="border-2 rounded-xl my-5 py-5 mx-3">
          <div className="flex flex-col md:flex-row justify-between items-center p-5 gap-4">
            <a
              className="underline text-blue-500"
              href={user?.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
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

        <div className="border-2 rounded-xl mx-3 my-5">
          <div className="p-5">
            <h1 className="font-bold text-lg mb-3">Password</h1>
            {user?.isGoogleUser ? (
              !user?.hasPassword ? (
                <div>
                  <p className="text-gray-600">
                    You are logged in with Google. Set a password for additional
                    login options:
                  </p>
                  <Button
                    className="bg-blue-500 text-white"
                    variant="outline"
                    onClick={() => setGooglePassword(true)}
                  >
                    Set Password
                  </Button>
                  <UpdateGooglePassword
                    googlePassword={googlePassword}
                    setGooglePassword={setGooglePassword}
                  />
                </div>
              ) : (
                <div>
                  <p className="text-gray-600">
                    You can change your password here:
                  </p>
                  <Button
                    className="bg-blue-500 text-white"
                    variant="outline"
                    onClick={() => setResetPassword(true)}
                  >
                    Change Password
                  </Button>
                  <UpdateChangePassword
                    resetPassword={resetPassword}
                    setResetPassword={setResetPassword}
                  />
                </div>
              )
            ) : (
              <div>
                <p className="text-gray-600">
                  You can change your password here:
                </p>
                <Button
                  className="bg-blue-500 text-white"
                  variant="outline"
                  onClick={() => setResetPassword(true)}
                >
                  Change Password
                </Button>
                <UpdateChangePassword
                  resetPassword={resetPassword}
                  setResetPassword={setResetPassword}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/4 h-[70vh] py-10 bg-slate-50 border-2 rounded-3xl shadow-lg p-5 flex flex-col items-center gap-8">
  <h2 className="font-bold text-lg text-center">Complete your profile</h2>
  <div className="relative w-28 h-28 md:w-36 md:h-36 overflow-hidden">
    <svg
      className="absolute inset-0 transform -rotate-90"
      viewBox="0 0 36 36"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
      </defs>
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
        stroke="url(#gradient)"
        strokeWidth="6"
        strokeDasharray={`${progress}, 100`}
        strokeDashoffset="0"
        fill="none"
        cx="18"
        cy="18"
        r="15.9155"
        className="drop-shadow-md"
      />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
      <span className="font-bold text-xl text-gray-800">{progress}%</span>
      <span className="text-sm text-gray-500">Complete</span>
    </div>
  </div>
  <ul className="text-sm md:text-lg w-full flex flex-col items-center text-center gap-4">
    <li className="flex items-center justify-center gap-2">
      {renderIcon(user?.profilePhoto)}
      <span>Profile Photo</span>
    </li>
    <li className="flex items-center justify-center gap-2">
      {renderIcon(user?.resume)}
      <span>Resume</span>
    </li>
    <li className="flex items-center justify-center gap-2">
      {renderIcon(user?.bio)}
      <span>Bio</span>
    </li>
    <li className="flex items-center justify-center gap-2">
      {renderIcon(
        user?.fullName ||
          user?.email ||
          user?.languages?.length > 0 ||
          user?.professionalTitle
      )}
      <span>Personal Info</span>
    </li>
  </ul>
</div>

    </div>
  );
};

export default EditProfile;
