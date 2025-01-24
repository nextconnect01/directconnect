import React from 'react';
import GoogleIcon from '@mui/icons-material/Google';

const GoogleLoginButton = () => {
  const backendUri = import.meta.env.VITE_BACKEND_URL;

  const handleLoginButton = () => {
    window.location.href = `${backendUri}/api/v1/auth/google`
  }
  return (
    <button onClick = {handleLoginButton} className="flex  hover:bg-[#2164f3] hover:text-white  items-center justify-center gap-3 px-6 py-2 w-full max-w-sm border border-gray-300 rounded-md shadow-md bg-white ">
      
      {/* Google Icon */}
      <GoogleIcon className="text-blue-500 hover:text-white  " />
      
      {/* Button Text */}
      <span className="text-gray-700 font-medium hover:text-white">Login with Google</span>
    </button>
  );
};

export default GoogleLoginButton;
