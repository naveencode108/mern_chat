import mongoose from 'mongoose';

const messageSchema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },

    text:{
        type:String
    },
    image:{
        type:String
    },

},{timestamps:true});

export default mongoose.model('message',messageSchema);