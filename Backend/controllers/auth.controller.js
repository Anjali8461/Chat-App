import bcrypt from "bcryptjs";
import User from '../models/user.model.js'
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const signup = async (req, res) => {
    try{
      const {fullName,username,password,confirmPassword,gender} = req.body;
      if(password!=confirmPassword){
        return res.status(400).json({error:"password don not match"});
      }
      const user = await User.findOne({username});
      if(user){
        return res.status(400).json({error:"username already taken"});
      }

    //   Hash password Here 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    // https://avatar.iran.liara.run/public
    const boyprofilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const newUser = new User({
       fullName,
       username,
       password:hashedPassword, 
       confirmPassword,
       gender:"male",
       profilePic:boyprofilePic
    });

    if(newUser){
        // Generate JWT token here 
        generateTokenAndSetCookie(newUser._id,res);
        await newUser.save();
       res.status(201).json({
        _id:newUser._id,
        fullName: newUser.fullName,
        username:newUser.username,
        profilePic:newUser.profilePic
    })
    }else{
        res.status(500).json({error:"something went wrong"})
    }
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({error:error.message})

    }
};
export const login = async  (req, res) => {
    try{
       const{username,password} = req.body;
       const user = await User.findOne({username});
       const isPasswordCorrect = await bcrypt.compare(password, user?.password|| "");     
       if(!user || !isPasswordCorrect){
        return res.status(400).json({error:"username or password is incorrect"}); 
       }
       generateTokenAndSetCookie(user._id,res);
       res.status(200).json({
        _id:user._id,
        fullName: user.fullName,
        username:user.username,
        profilePic:user.profilePic,
       })
    }catch(error){
        console.log(error.message);
        res.status(500).json({error:error.message})
    }
};
export const logout = (req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"successfully logged out"})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:error.message})
    }
};