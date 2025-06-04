import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { setSocket } from "../redux/socketSlice.js";
import {
  increamentUnreadMessage,
  setOnlineUsers,
} from "../redux/chatSlice.js";
import {
  addNotifications,
  increamentUnreadNotificationCount,
  setJobNotifications,
  setMessageNotifications,
} from "@/redux/rtnSlice.js";

const SocketProvider = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { socket } = useSelector((store) => store.socketio);
  const socketInitialized = useRef(false); // ✅ this keeps it from re-creating socket

  const backendUri = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (user && !socket && !socketInitialized.current) {
      const socketio = io(`${backendUri}`, {
        query: { userId: user._id },
      });

      dispatch(setSocket(socketio)); // ✅ still saving to Redux
      socketInitialized.current = true; // prevent multiple connections

      socketio.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on("notification", (notification) => {
        dispatch(increamentUnreadNotificationCount(notification.userId));
        dispatch(addNotifications(notification));

        if (notification.type === "message") {
          dispatch(setMessageNotifications(notification));
          dispatch(increamentUnreadMessage(notification.userId));
        } else if (notification.type === "job") {
          dispatch(setJobNotifications(notification));
        } else if (notification.type === "Proposals") {
          dispatch(addNotifications(notification));
        }
      });

      // Cleanup on unmount
      return () => {
        socketio.close();
        dispatch(setSocket(null));
        socketInitialized.current = false;
      };
    }
  }, [user, dispatch]);

  return null;
};

export default SocketProvider;
