// require('dotenv').config()

// import mongoose from "mongoose ";
// import {DB_NAME} from "../constants"  ;
import connectDB from "./db/index.js";
import app from "./app.js"
import dotenv from "dotenv"
// const app = express();
dotenv.config({
   path: './env'
})


connectDB()
.then(()=>{
   app.listen(process.env.PORT || 8000 , ()=>{
      console.log(`Server is running at port : ${process.env.PORT || 8000
      }`)
   })
})
.catch((err)=>{
  console.log(`MONGOD copnnection failed !!! ;`,err)
})




export default app 













// function connectDB(){}
// connectDB()
// (async ()=>{
//    try{
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//    }catch(error){
//     console.error("ERROR :" , error)
//    }
// })() 