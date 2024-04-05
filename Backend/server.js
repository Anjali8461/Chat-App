import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";
import connectToMonodb from './db/connectToMongodb.js';
import userRoute from "./routes/userRoute.js"

const app = express();

dotenv.config(); 
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;
app.get("/",(req,res)=> {
    res.send("Hello World!!!")
});
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoute)
app.listen(PORT,()=> {
    connectToMonodb()
    console.log(`server listening on ${PORT}`)
});