import mongoose from 'mongoose';


export const connectDb=async()=>{
  try{
     let conn=await mongoose.connect(process.env.MONGODB_URI);
     console.log("DB is connected ");
  }
  catch(er){
    console.log(er.message);
  }
}