
import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cloudinary from '../config/cloudinary.js';


export const Signup = async (req, res) => {

   try {
      const { fullName, email, password } = req.body;

      const user = await userModel.findOne({ email });

      if (user) return res.status(200).json({ success: false, message: 'Invalid Email and Password' });


      const hash = await bcrypt.hash(password, 10);

      await userModel.create({
         fullName,
         email,
         password: hash
      })

      return res.status(200).json({ success: true, message: 'User created Successfully' });

   }
   catch (er) {
      console.log(er);
      return res.status(500).json({ success: false, message: er.message });
   }

}

export const Login = async (req, res) => {
   try {

      const { email, password } = req.body;

      let user = await userModel.findOne({ email });

      if (!user) return res.status(200).json({ success: false, message: "Invalid Email and Password" });

      let checkPass = await bcrypt.compare(password, user.password);
      if (!checkPass) return res.status(200).json({ success: false, message: "Invalid Email and Password" });


      let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

      res.cookie('login_token', token, { httpOnly: true, sameSite: 'Strict', maxAge: 7 * 24 * 60 * 60 * 1000 });

      return res.status(200).json({ success: true, message: user });


   }
   catch (er) {
      return res.status(500).json({ success: false, message: er.message });
   }
}


export function Logout(req, res) {
   try {
      res.clearCookie("login_token", { maxAge: 0 })
      return res.status(200).json({ success: true, message: "Logged Out successfully" });
   } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
   }
}

export const Check = async(req, res) => {
   try {
      let token = req.cookies.login_token;

      if (!token) return res.json({ success: false });
      let decode = jwt.verify(token, process.env.JWT_SECRET);

      let user=await userModel.findOne({_id:decode.id});
      
      return res.json({ success: true, message: user });
   }
   catch (er) {
      return res.json({ success: false, message: er.message });
   }
}

export const getUser = async (req, res) => {
   try {
      let userId = req.userId;

      let findUser = await userModel.find({ _id: userId });
      if (!findUser) return res.json({ success: false, message: 'Something went wrong' });

      return res.status(200).json({success:true,message:findUser});

   }
   catch (er) {
      return res.status(500).json({ success: false, message: er.message });
   }
}

// todo
export const updateProfile = async(req, res) => {
   try {
     let {name,image}=req.body;

     let userId=req.userId;

     let user=await userModel.findOne({_id:userId});

     if(image){
        let imgurl=await cloudinary.uploader.upload(image,{resource_type:'image'});
        user.profilePic=imgurl.secure_url;
     }

     user.fullName=name;

     await user.save();

     return res.status(200).json({success:true,message:'Profile Updated'});

   } catch (er) {
      return res.status(500).json({success:false,message:er.message});
   }

}