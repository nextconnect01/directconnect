import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";

const GoogleSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userParam = params.get("user");

    if (userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        const flattenedUser = {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          username: user.username,
          activeJobs: user.activeJobs || [],
          proposalsSent: user.proposalsSent || [],
          hiringAssistantStatus: user.hiringAssistantStatus || "Inactive",

          // Flattened profile
          profilePhoto: user.profile?.profilePhoto,
          bio: user.profile?.bio,
          languages: user.profile?.languages || [],
          professionalTitle: user.profile?.professionalTitle,

          // Flattened skillProfile
          resume: user.skillProfile?.resume,
          resumeOriginalName: user.skillProfile?.resumeOriginalName,
          category: user.skillProfile?.category,
          subCategory: user.skillProfile?.subCategory || [],

          // Keep any other fields if needed
          isGoogleUser: user.isGoogleUser,
          hasPassword: user.hasPassword,
        };        

        dispatch(setUser(flattenedUser)); // ✅ Update Redux store

        // ✅ Redirect based on role
        if (!user.role) {
          navigate("/select-role"); // or any screen you have
        } else if (user.role === "freelancer") {
          navigate("/freelancersHome");
        } else if (user.role === "client") {
          navigate("/myJobs");
        } else {
          navigate("/"); // fallback
        }
      } catch (error) {
        console.error("Error parsing user from query param:", error);
        navigate("/login"); // fallback
      }
    } else {
      navigate("/login"); // fallback
    }
  }, [location.search, dispatch, navigate]);

  return <p>Logging you in...</p>; // or show a loader
};

export default GoogleSuccess;
