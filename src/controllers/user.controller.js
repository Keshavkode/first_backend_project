import {  asynchandler } from  "../utils/asynchandler.js"
import {ApiError} from "../utils/apierror.js"
// import { User } from "../modals/user.modal.js"
import {uploaderfile} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiresponse.js"

const registerUser = asynchandler(async (req,res) =>{
           // get user details from frontend
           // validation - not empty
           //check if user already exist : username ,email
           // check for images ,avtar 
           // upload them to cloudinary , avtar 
           // create user object - create entry in db
           //remove password and refresh token field from response
           // check for user creation
           // return response


            //  step 1   get user details from frontend

 const {fullname , email, username,password}= req.body
 console.log("email: ", email);


              
              // step 2   validation - not empty

 if(fullname === ""){
     throw new ApiError(400 , "fullname is required")
 }
 if(email === ""){
     throw new ApiError(400 , "email is required")
 }
 if(username === ""){
     throw new ApiError(400 , "username is required")
 }
 if(password === ""){
     throw new ApiError(400 , "password is required")
 }



             //step 3   check if user already exist : username ,email

const existedUser = User.findOne({
    $or:[ { username }, { email }]
 })

 if(existedUser){
    throw new ApiError(409 ,"username alrerady exist ")
 }



              // step 4 check for images ,avtar 

 const avatarLocalPath = req.files?.avatar[0]?.path;
 const coverImageLocalPath = req.files?.coverImage[0]?.path;

 if(avatarLocalPath){
    throw new ApiError(400, "avatar image not found")
 }


                  // step 5 upload them to cloudinary , avtar 

  const avatar =await uploaderfil(avatarLocalPath);
  const coverImage = await uploaderfile(coverImageLocalPath)
if(!avatar){
    throw(400,"avatar file is required")
}


         // step 6 create user object - create entry in db

const User =await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage.url || "",
    email,
    password,
    username: username.toLowerCase()
})


              // step 7 remove password and refresh token field from response

const createdUser =await User.findById(user._id)
      .select( "-password -refreshtokens")


             // step 8 check for user creation

      if(createdUser){
        throw new ApiError(500, "problem in registreing user")
      }


               // step 9 return response 

      return res.status(201).json(
        new ApiResponse(200, createdUser , "user register successful")
      )
})


export {registerUser}