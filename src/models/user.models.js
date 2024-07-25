import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const UserSchema = new Schema({
    name:{
        type:String,
        required: true,
        index:true,
        trim: true
    },
    email:{
        type:String,
        required: true,
        index:true,
        trim: true
    },
    age:{
        type:Number,
        required: true,
        index:true
    },
    password:{
        type:String,
        required: true,
        index:true,
        trim: true
    },
    avatar:{
        type:String,
        required: true,
    },
    refreshToken:{
        type:String
    }
 
},
{
    timestamps:true
})

UserSchema.pre("save", async function(next){
   if(!this.isModified("password")) return next();
   this.password = await bcrypt.hash(this.password, 10)
   next()
});

UserSchema.methods.isPasswordCorrect = async function(password){
    // console.log("password is correct")
 return await bcrypt.compare(password, this.password)
 
}

UserSchema.methods.generateAccessToken =  function(){
     console.log("a s=>",process.env.ACCESS_TOKEN_SECRET)
     console.log("a e=>",process.env.ACCESS_TOKEN_EXPIRY)
    //  console.log(this._id)

     return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            email:this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
       expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }

)
}

UserSchema.methods.generateRefreshToken = function(){
    console.log("r a=>",process.env.REFRESH_TOKEN_SECRET)
      console.log("r e=>",process.env.REFRESH_TOKEN_EXPIRY)
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", UserSchema)