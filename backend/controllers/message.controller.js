import cloudinary from "../db/cloudinary.js"
import { Conversation } from "../models/conversation.model.js"
import { Job } from "../models/job.models.js"
import { Message } from "../models/message.model.js"
import { Notification } from "../models/notification.models.js"
import { User } from "../models/user.model.js"
import { getRecieverSocketId,io } from "../socket.js"

export const sendMessage = async (req,res) => {

    try {
        const ladka = req.id
        const ladki = req.params.id
        const {message} = req.body
        if(!message){
            return res.status(401).json({
                message : "Message cannot be empty",
                success : false
            })
        }

        let conversation = await Conversation.findOne({
            participants : {$all : [ladka,ladki]}
        })

        if (!conversation){
            conversation = await Conversation.create({
                participants : [ladka,ladki]
            })
        }
        const newMessage = await Message.create({
            message,
            sendersId : ladka,
            recieversId : ladki
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)

        }
        await Promise.all([conversation.save(),newMessage.save()])
        const sender = await User.findById(ladka)

        const notification = await Notification.create({
          sendersDetail : ladka,
          recieversDetail : ladki,
          category : "Message",
          message : `${sender?.fullName} Sent You A Message`

        })
        //socket io implementation for real time updates
        const recieverSocketId = getRecieverSocketId(ladki)
        if(recieverSocketId){
            io.to(recieverSocketId).emit('newMessage',newMessage)
            

            io.to(recieverSocketId).emit('notification',notification)
            console.log("messageNotification",notification);
            
            

           

        }

        return res.status(200).json({
            success : true,
            newMessage
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const deleteMessage = async (req, res) => {
  try {
    const userId = req.id;
    const messageId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
        success: false,
      });
    }

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({
        message: "No Such Message Found",
        success: false,
      });
    }

    // Delete all associated project briefs (Jobs)
    if (message.projectBrief && message.projectBrief.length > 0) {
      await Promise.all(
        message.projectBrief.map(async (jobId) => {
          await Job.findByIdAndDelete(jobId);
        })
      );
    }

    // Delete the message
    await Message.findByIdAndDelete(messageId);

    return res.status(200).json({
      message: "Message and linked Project Brief(s) deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};




export const getMessage = async (req,res) => {
    try {
        const ladka = req.id
        const ladki = req.params.id
        

        const conversation = await Conversation.findOne({
            participants: { $all: [ladka, ladki] },
          }).populate({
            path: 'messages',
            populate: {
              path: 'projectBrief',   // populate the Job inside each message
              model: 'Job',
            },
          });

        if(!conversation){
            return res.status(200).json({
                message : [],
                success : true
            })
        }

        return res.status(200).json({
            message : conversation?.messages,
            success : true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Internal Server Error",
            success : false
        })
        
    }
}

export const getClientContacts = async (req, res) => {
    try {
      const currentUserId = req.id;
  
      // Find all conversations that include this user
      const conversations = await Conversation.find({
        participants: currentUserId,
      });
  
      // Collect the other participants (i.e., not the logged-in user)
      const otherUserIds = new Set();
  
      conversations.forEach((conv) => {
        conv.participants.forEach((participantId) => {
          if (participantId.toString() !== currentUserId) {
            otherUserIds.add(participantId.toString());
          }
        });
      });
  
      // Fetch only clients from those users
      const clients = await User.find({
        _id: { $in: Array.from(otherUserIds) },
        role: "client",
      })
  
      return res.status(200).json({
        success: true,
        clients,
      });
  
    } catch (err) {
      console.error("Error in getClientContacts:", err);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };

  export const deleteConversation = async(req,res) => {
    try {
        const userId = req.id
        const otherUserId =  req.params.id
        const user = await User.findById(userId)
        if(!user ){
          return res.status(404).json({
            message : "User Not Found",
            success : false
          })
        }

        const conversation = await Conversation.findOne({
          participants : {$all : [userId,otherUserId]}
        })

        if(!conversation || conversation.length === 0){
          return res.status(400).json({
            message : "No Conversation Found Between the Two users",
            success : false
          })
        }

        await Message.deleteMany({_id : {$in : conversation?.messages}})
        await Conversation.findByIdAndDelete(conversation?._id)

        return res.status(200).json({
          message : "Conversation And The Messages Deleted Successfully",
          success : true
        })
        
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message : "Internal Server Error",
        success : false
      })
      
    }
  }