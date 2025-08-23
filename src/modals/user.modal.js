import mongoose , {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const UserSchema = new Schema(
    {
      username  :{
        type : String,
        required :true,
        unique : true,
        lowercase : true,
        index : true    // isse ye searching list me bhi aa jaeyga
      },
      email :{
        type : String,
        required :true,
        unique : true,
        lowercase : true,
        index : true    // isse ye searching list me bhi aa jaeyga
      },
      fullname :{
        type : String,
        required :true,
        index : true    // isse ye searching list me bhi aa jaeyga
      },
      username  :{
        type : String,
        required :true,
        unique : true,
        lowercase : true,
        index : true    // isse ye searching list me bhi aa jaeyga
      },
      avatar :{
        type : String,  //cloudnary URL
        required :true,
        
      },
      coverimage  :{
        type : String,
      },

      watchhistory :[{
        type : Schema.Types.ObjecId,
        ref :"videos",
    }],

      password :{
        type : String,
        required :[true,'paasword is required'],
        unique : true,

      },
         refreshtokens  :{
        type : String,
       
      },
    },{timestamps : true}
)


UserSchema.pre("save" ,async function (next){

  if(!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password ,10)
  next()
})


UserSchema.methods.isPasswordCorrect = async function (password) {
 return await bcrypt.compare(password, this.password)
}

UserSchema.methods.generateAccessToken = function(){
  return jwt.sign({
    _id: this._id,
    email:this.email,
    username:this.username,
    fullname :this.fullname
  },
  process.env.ACCESS_TOKEN_SECRET,{
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
  }
)
}
UserSchema.methods.generaterefreshToken = function(){
   return jwt.sign({
    _id: this._id
  },
  process.env.REFRESH_TOKEN_SECRET,{
    expiresIn:process.env.REFRESH_TOKEN_EXPIRY
  }
)
}


export const User = mongoose.modal("User",UserSchema) 