import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MessageCircleCode, Plus, Search, Trash2 } from "lucide-react";
import MessageInside from "./MessageInside";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import axios from "axios";
import {
  clearUserContacts,
  removeMessagingClients,
  removeUserContact,
  setSelectedUser,
} from "@/redux/authSlice";
import { setMessages } from "@/redux/chatSlice";
import { clearMessageNotifications } from "@/redux/rtnSlice";
import Navbar from "./shared/Navbar";
import ChatAddDialog from "./ChatAddDialog";
import useGetAllClients from "@/hooks/useGetAllClients";
import DialogProjectBrief from "./DialogProjectBrief";
import FreelancersFooter from "./freelancer/FreelancersFooter";
import ClientFooter from "./Client/ClientFooter";

const Message = () => {
  const backendUri = import.meta.env.VITE_BACKEND_URL

  useGetAllClients();
  const [addToChat, setAddToChat] = useState(false);
  const [textMessage, setTextMessage] = useState("");
  const { unreadMessage } = useSelector((store) => store.chat);
  const { user, userContacts, selectedUser } = useSelector(
    (store) => store.auth
  );
  const { onlineUsers, messages } = useSelector((store) => store.chat);
  const { messagingClients } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [projectBrief, setProjectBrief] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const filteredUserContacts = userContacts?.filter((contacts) => {
    const fullName = contacts?.fullName?.toLowerCase() || "";
    return fullName.includes(searchItem?.toLowerCase());
  });

  const sendMessageHandler = async (e) => {
    try {
      e.preventDefault()
      const res = await axios.post(
        `${backendUri}/api/v1/message/sendMessage/${selectedUser?._id}`,
        { message: textMessage },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(res.data);

      if (res.data.success) {
        console.log("New message received from API:", res.data.newMessage);
        dispatch(setMessages([...messages, res.data.newMessage]));
        setTextMessage("");
      } else {
        console.error("API responded but success flag is false:", res.data);
        toast.error("Failed to send message");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, []);

  return (
    <div className="h-full w-full pt-5">
      <Navbar />
      <div className="flex w-full bg-[#F5F5F5] p-5 h-full">
        <div className="w-[300px] bg-white shadow-2x rounded-lg px-4 border-r border-gray-300 overflow-y-auto">
          <div className="flex mt-5 justify-between  ">
            <h1 className="font-bold text-xl">Message</h1>
            <Plus
              onClick={() => setAddToChat(true)}
              className={` ${
                user.role === "freelancer"
                  ? "hidden"
                  : "text-blue-700 cursor-pointer"
              }`}
            />
          </div>
          <ChatAddDialog open={addToChat} setOpen={setAddToChat} />
          <div className="relative mt-5 w-full mb-5 ">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input
              onChange={(e) => setSearchItem(e.target.value)}
              value={searchItem}
              className="pl-10"
              type="text"
              placeholder="Search Conversations"
            />
          </div>

          {user?.role === "client" ? (
            <div>
              {filteredUserContacts?.map((user) => {
                const isOnline = onlineUsers.includes(user?._id);
                return (
                  <div
                    key={user?._id}
                    className="flex items-center gap-4 p-2 hover:bg-gray-200 rounded-lg cursor-pointer"
                    onClick={() => {
                      dispatch(setSelectedUser(user));
                      dispatch(clearMessageNotifications(user._id));
                    }}
                  >
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        className="object-cover rounded-full"
                        src={user?.profile?.profilePhoto}
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-bold">{user?.fullName}</p>
                      <p
                        className={`text-xs ${
                          isOnline ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {isOnline ? "Online" : "Offline"}
                      </p>
                    </div>
                    <Trash2
                      onClick={() => dispatch(removeUserContact(user?._id))}
                    />
                    {unreadMessage[user._id] > 0 && (
                      <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                        {unreadMessage[user._id]}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              {messagingClients?.map((client) => {
                const isOnline = onlineUsers.includes(client?._id);
                return (
                  <div
                    className="flex items-center gap-4 p-2 hover:bg-gray-200 rounded-lg cursor-pointer"
                    key={client?._id}
                    onClick={() => {
                      dispatch(setSelectedUser(client));
                    }}
                  >
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        className="object-cover rounded-full"
                        src={client?.profile?.profilePhoto}
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-bold">{client?.fullName}</p>
                      <p
                        className={`text-xs ${
                          isOnline ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {isOnline ? "Online" : "Offline"}
                      </p>
                    </div>
                    <Trash2
                      onClick={() =>
                        dispatch(removeMessagingClients(client?._id))
                      }
                    />
                    {unreadMessage[client._id] > 0 && (
                      <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                        {unreadMessage[client._id]}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex-1 bg-white shadow-2x rounded-lg flex flex-col h-screen ">
          {selectedUser ? (
            <div className="flex flex-col h-full">
              <div className="p-4 border-b flex items-center gap-4 bg-white shadow-md">
                <Avatar className="w-14 h-14">
                  <AvatarImage
                    className="object-cover cursor-pointer rounded-full"
                    src={selectedUser?.profile?.profilePhoto}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="font-semibold text-lg">
                  {selectedUser?.username}
                </p>
              </div>
              <div className="flex-1 overflow-y-auto">
                <MessageInside selectedUser={selectedUser} />
              </div>{" "}
              <div className="p-4 border-t bg-white">
  <form
    onSubmit={sendMessageHandler}
    className="flex gap-4 w-full"
  >
    <Input
      className="flex-1 border rounded-lg px-3 py-2 focus:ring-transparent"
      placeholder="Type a message..."
      value={textMessage}
      onChange={(e) => setTextMessage(e.target.value)}
      type="text"
    />
    <Button
      onclick ={sendMessageHandler}
      type="submit"
      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
    >
      Send
    </Button>
  </form>
</div>

              <Button
                onClick={() => setProjectBrief(true)}
                variant="outline"
                className="mb-10 ml-5 w-[200px]  bg-green-600 text-white hover:bg-green-700 hover:text-white"
              >
                Add Project Brief <Plus size={"30px"} />
              </Button>
              <DialogProjectBrief
                selectedUser={selectedUser}
                open={projectBrief}
                setOpen={setProjectBrief}
              />
            </div>
          ) : (
            <div className="flex flex-col h-full justify-center items-center text-gray-600">
              <MessageCircleCode className="w-24 h-24 text-gray-400" />
              <p className="font-bold text-lg">Your Messages</p>
              <p className="text-sm">Send a message to start a chat</p>
            </div>
          )}
        </div>
      </div>
      {user?.role === "freelancer" ? (<FreelancersFooter/>) : (<ClientFooter/>)}
    </div>
  );
};

export default Message;
