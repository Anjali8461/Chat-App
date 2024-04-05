import mongoose from "mongoose";
const connectToMonodb = async ()=>{
    try{
       await mongoose.connect(process.env.MONGO_DB_URL)
       console.log("Successfully connected to Mongodb");
    }
    catch(error){
        console.log("Error connecting to Mongodb",error.message)
    }
}
export default connectToMonodb;