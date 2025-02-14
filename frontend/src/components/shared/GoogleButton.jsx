import React from "react";

const GoogleLoginButton = () => {
  const backendUri = import.meta.env.VITE_BACKEND_URL;

  const handleLoginButton = ({ clearInputs }) => {
    if (clearInputs) {
      clearInputs(); // Clear email and password fields
    }
    window.location.href = `${backendUri}/api/v1/auth/google`;
  };

  return (
    <button
      type="button" // Prevent form submission
      onClick={handleLoginButton}
      className="flex items-center justify-center text-xl  gap-3 px-6 py-2 w-full max-w-sm border border-gray-300 rounded-md shadow-md bg-white text-black hover:bg-blue-500 hover:text-white"
    >
      {/* Google Icon */}
      <img
        src="../../../images/google.png"
        alt="Google G Logo"
        className="w-6 h-6"
      />

      {/* Button Text */}
      <span className="font-medium">Login with Google</span>
    </button>
  );
};

export default GoogleLoginButton;
