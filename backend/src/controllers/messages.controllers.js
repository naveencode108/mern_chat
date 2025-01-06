import userModel from "../models/user.model.js";
import messageModel from '../models/message.model.js'
import { v2 as cloudinary } from 'cloudinary'
import { getReceiverSocketId, io } from "../index.js";

export const getUser = async (req, res) => {
   try {

      let id = req.userId;
      let user = await userModel.find({ _id: { $ne: id } }).select('-password');
      return res.status(200).json({ success: true, message: user });

   }
   catch (er) {
      return res.status(500).json({ success: false, message: er.message });
   }
}

export const getMessages = async (req, res) => {
   try {

      const myid = req.userId;
      const { id: userId } = req.params;

      const messages = await messageModel.find({
         $or: [
            { senderId: myid, receiverId: userId },
            { senderId: userId, receiverId: myid }
         ]
      })

      return res.status(200).json({ success: true, message: messages });

   } catch (er) {
      return res.status(500).json({ success: false, message: er.message });

   }
}

export const sendMessages = async (req, res) => {
   try {

      const senderId = req.userId;
      const { id: receiverId } = req.params

      const { text, image } = req.body;

      let imgurl;

      if (image) {
         const url = await cloudinary.uploader.upload(image, { resource_type: 'auto' });
         imgurl = url.secure_url;
      }

      const newMessage = await messageModel.create({
         senderId,
         receiverId,
         text,
         image: imgurl
      });

      const receiverSocketid = getReceiverSocketId(receiverId);
      io.to(receiverSocketid).emit('typing',{
         isTyping:null,
         receiverId:null
      });
      
      if (receiverSocketid) {
         io.to(receiverSocketid).emit('newMessage', newMessage);
      }

      return res.status(200).json({ success: true, message: newMessage });


   } catch (er) {
      return res.status(500).json({ success: false, message: er.message });

   }
}

export const getTyping=(req,res)=>{
      const {senderId,textLength}=req.body;
      const userId=req.userId;

      const senderSocketId=getReceiverSocketId(senderId);

      if(textLength>0){
         io.to(senderSocketId).emit('typing',{
            isTyping:true,
            senderId:userId
      });
      }
      else{
         io.to(senderSocketId).emit('typing',{
            isTyping:null,
            senderId:null
         });
      }

      return res.status(200).json({success:true});
}