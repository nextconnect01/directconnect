import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { setSocket } from "../redux/socketSlice.js";
import {  increamentUnreadMessage,setOnlineUsers } from "../redux/chatSlice.js";
import { addNotifications, increamentUnreadNotificationCount, setAllNotifications, setAllUnreadNotification, setJobNotifications, setMessageNotifications } from "@/redux/rtnSlice.js";

const SocketProvider = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { socket } = useSelector((store) => store.socketio);
  const {allNotifications,unreadNotifications} = useSelector(store => store.realTimeNotification)
  const backendUri = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {

    if (user && !socket) {
      const socketio = io(`${backendUri}`, {
        query: { userId: user?._id },
        
      });

      dispatch(setSocket(socketio));

      socketio.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      

      socketio.on("notification", (notification) => {
        console.log("Notification RECEIVED 🔔", notification);

        dispatch(increamentUnreadNotificationCount(notification.userId))
        console.log("Received Notification", notification);
        dispatch(addNotifications(notification))

        if (notification.type === "message") {
          dispatch(setMessageNotifications(notification));
          dispatch(increamentUnreadMessage(notification.userId));
          dispatch(addNotifications(notification))

        } else if(notification.type === "job"){
          dispatch(setJobNotifications(notification))
        } else if (notification.type === "Proposals"){
          dispatch(addNotifications(notification))
        }
      });

      return () => {
        socketio.close();
        dispatch(setSocket(null));
      };
    }
  }, [user, dispatch]);

  return null; // This component doesn't render anything
};

export default SocketProvider;
