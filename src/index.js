// require('dotenv').config()

// import mongoose from "mongoose ";
// import {DB_NAME} from "../constants"  ;
import connectDB from "./db/index.js";

import dotenv from "dotenv"

dotenv.config({
   path: './env'
})


connectDB()

















// function connectDB(){}
// connectDB()
// (async ()=>{
//    try{
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//    }catch(error){
//     console.error("ERROR :" , error)
//    }
// })() 