import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/Home";
import Offering from "./components/Offering";
import Blog from "./components/Blog";
import About from "./components/About";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import { Toaster } from "./components/ui/sonner.jsx";
import EditProfile from "./components/EditProfile";
import BlogInside from "./components/BlogInside";
import Browse from "./components/Browse";
import ComingSoon from "./components/ComingSoon";
import ForgetPasswordEmail from "./components/ForgetPassword/ForgetPasswordEmail";
import RecoverPassword from "./components/ForgetPassword/RecoverPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import PrivacyPolicy from "./components/shared/PrivacyPolicy";
import TermsAndConditions from "./components/shared/TermsAndConditions";
import { HelmetProvider } from "react-helmet-async";
import DashboardClient from "./components/Client/DashboardClient";
import FindTalent from "./components/Client/FindTalent";
import MyJobs from "./components/Client/MyJobs";
import Transaction from "./components/Client/Transaction";
import Community from "./components/Client/Community";
import PostJobs from "./components/Client/PostJobs";
import HireSelectionAssistant from "./components/Client/HireSelectionAssistant";
import ScreeningTools from "./components/Client/ScreeningTools";
import FindJobs from "./components/freelancer/FindJobs";
import MyProjects from "./components/freelancer/MyProjects";
import Proposals from "./components/freelancer/Proposals";
import Mentorship from "./components/freelancer/Mentorship";
import Earning from "./components/freelancer/Earning";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { setSocket } from "./redux/socketSlice";
import { setMessageNotifications } from "./redux/rtnSlice";
import Message from "./components/Message";
import SocketProvider from "./components/SocketProvider";
import EditJobs from "./components/Client/EditJobs";
import ViewApplicants from "./components/Client/ViewApplicants";
import CompletedJob from "./components/Client/CompletedJob";
import Notification from "./components/Notification";
import JoinMentorship from "./components/freelancer/JoinMentorship";
import LogoutOnTabClose from "./components/auth/LogoutOnTabClose";
import FreelancerHome from "./components/freelancer/FreelancerHome";
import HiringAssistant from "./components/freelancer/HiringAssistant";
import ApplyHiringForm from "./components/freelancer/ApplyHiringForm";
import HiringAssistantDashboard from "./components/freelancer/HiringAssistantDashboard";
import TakeAction from "./components/Client/TakeAction";
import ReviewChanges from "./components/Client/ReviewChanges";
import ViewRevision from "./components/freelancer/ViewRevision";
import GoogleSuccess from "./components/auth/GoogleSuccess";
import SelectRole from "./components/SelectRole";
import AdminPanel from "./components/Admin/AdminPanel";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/coming-soon", element: <ComingSoon /> },
    { path: "/offering", element: <Offering /> },
    { path: "/blog", element: <Blog /> },
    { path: "/blogInside/:id", element: <BlogInside /> },
    { path: "/about", element: <About /> },
    { path: "/SignUp", element: <SignUp /> },
    { path: "/login", element: <Login /> },
    { path: "/editProfile", element: <ProtectedRoute><EditProfile /></ProtectedRoute> },
    { path: "/browse", element: <Browse /> },
    { path: "/forget-password", element: <ForgetPasswordEmail /> },
    { path: "/recover-password/:id", element: <RecoverPassword /> },
    { path: "/privacy-policy", element: <PrivacyPolicy /> },
    { path: "/terms-condition", element: <TermsAndConditions /> },
    {path : "/client-dashboard" , element : <ProtectedRoute><DashboardClient/></ProtectedRoute>},
    {path : "/find-talent",element:<FindTalent/>},
    {path : "/myJobs",element : <MyJobs/>},
    {path : "/transaction",element : <Transaction/>},
    { path: "/community", element:<Community/> },
    {path : "/post-jobs",element : <PostJobs/>},
    {path : "/completedJobs", element : <CompletedJob/>},
    {path : "/edit-jobs" ,element : <EditJobs/>},
    {path: "/hire-selectionAssistant", element: <HireSelectionAssistant/>},
    {path : "/screening-tools",element:<ScreeningTools/>},
    {path : "/freelancersHome",element : <FreelancerHome/>},
    {path : "/find-jobs" ,element :<FindJobs/>},
    {path : "/my-project",element : <MyProjects/>},
    {path : "/proposals",element : <Proposals/>},
    {path : "/mentorship",element : <Mentorship/>},
    {path : "/earnings",element : <Earning/>},
    {path : "/message" ,element: <Message/>},
    {path : "/viewApplicants", element : <ViewApplicants/>},
    {path : "/notification",element : <Notification/>},
    {path : "/joinAsMentor",element : <JoinMentorship/>},
    {path : "/joinHiringAssistant",element : <HiringAssistant/>},
    {path : "/applyHiringForm",element : <ApplyHiringForm/>},
    {path : "/hiringAssistantDashboard" ,element : <HiringAssistantDashboard/>},
    {path : "/takeAction",element : <TakeAction/>},
    {path : "/reviewChanges",element : <ReviewChanges/>},
    {path : "/viewRevision",element : <ViewRevision/>},
    {path : "/google-success",element : <GoogleSuccess/>},
    {path : "/select-role" ,element : <SelectRole/>},
    {path : "/adminPanel",element: <AdminPanel/>}

  ]);

  
  const { user } = useSelector((store) => store.auth);

  return (
    <HelmetProvider>
      <Toaster richColors />
      <RouterProvider key={user ? "loggedIn" : "loggedOut"} router={router} />
      {user && <SocketProvider />}  {/* Only load when user is logged in */}
      {user && <LogoutOnTabClose/>}
    </HelmetProvider>
  );
}

export default App;
