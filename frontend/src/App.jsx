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
    {path : "/client-dashboard" , element : <DashboardClient/>},
    {path : "/find-talent",element:<FindTalent/>},
    {path : "/myJobs",element : <MyJobs/>},
    {path : "/transaction",element : <Transaction/>},
    { path: "/community", element:<Community/> },
    {path : "/post-jobs",element : <PostJobs/>},
    {path : "/completedJobs", element : <CompletedJob/>},
    {path : "/edit-jobs" ,element : <EditJobs/>},
    {path: "/hire-selectionAssistant", element: <HireSelectionAssistant/>},
    {path : "/screening-tools",element:<ScreeningTools/>},
    {path : "/find-jobs" ,element :<FindJobs/>},
    {path : "/my-project",element : <MyProjects/>},
    {path : "/proposals",element : <Proposals/>},
    {path : "/mentorship",element : <Mentorship/>},
    {path : "/earnings",element : <Earning/>},
    {path : "/message" ,element: <Message/>},
    {path : "/viewApplicants", element : <ViewApplicants/>},
    {path : "/notification",element : <Notification/>},
    {path : "/joinAsMentor",element : <JoinMentorship/>}

  ]);

  // const dispatch = useDispatch()
  // const {user} = useSelector(store => store.auth)
  // const {socket} = useSelector(store => store.socketio)

  // useEffect(() => {
  //   if(user && !socket){
  //     const socketio = io('http://localhost:8000',{
  //       query : {
  //         userId : user?._id
  //       },
  //       transports : ['websocket']
  //     })
  //     dispatch(setSocket(socketio))

  //     socketio.on('getOnlineUsers',(onlineUsers) => {
  //       dispatch(setOnlineUsers(onlineUsers))
  //     })

  //     socketio.on('notification',(notification) => {
  //       console.log("Recieved Notification",notification);
  //       if(notification.type === "message"){
  //         dispatch(setMessageNotifications(notification))
  //         dispatch(increamentUnreadMessage(notification.userId))
  //       }
        
  //     })

  //     return () => {
  //       socketio.close()
  //       dispatch(setSocket(null))
  //     }

  //   } else if(socket){
  //     socket.close()
  //     dispatch(setSocket(null))
  //   }

  // } ,[user,dispatch])
  const { user } = useSelector((store) => store.auth);

  return (
    <HelmetProvider>
      <Toaster richColors />
      <RouterProvider key={user ? "loggedIn" : "loggedOut"} router={router} />
      {user && <SocketProvider />}  {/* Only load when user is logged in */}

    </HelmetProvider>
  );
}

export default App;
