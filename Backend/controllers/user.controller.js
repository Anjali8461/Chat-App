import User from '../models/user.model.js';
export const getUserForSidebar = async (req,res)=>{
    try{
       const loggedInUserId = req.user._id;
       const allUsers = await User.find().select("-password");
       res.status(200).json(allUsers)
    }
    catch(error){
        console.log("error in getUser sidebar :",error.message);
        res.status(500).json({error:error.message})
    }
}