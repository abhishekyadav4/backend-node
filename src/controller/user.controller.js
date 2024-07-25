
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"



// generating access and refresh tokens 

const generatingAccessAndRefreshTokens = async (userId)=>{
   try {
     const user = await User.findById(userId);
     const accessToken = user.generateAccessToken()
     const refreshToken = user.generateRefreshToken()

     user.refreshToken = refreshToken
   
//  saving in db 
    await user.save({validateBeforesave:false})
    // console.log("ac",accessToken)
    // console.log("rc",refreshToken);
     return {accessToken, refreshToken}
 }
    catch (error) {
        console.log("error in genrating access token and refresh token",error);
   }
}
// registration

const UserReg = async(req,res)=>{
    try{
        // res.status(200).json({
        //     message: "routing works ok"
        // })
       
        const {name, email, age, password} = req.body
        // console.log(name,email, age,password, avatar)

       
        // checking for empty fields
        if([name,email, age,password].some((field)=>{
            return field === ""
        })){
            res.status(200).json({
                message: "all field requred"
            })
          
            console.log("all field requred")
        }

        // checking for existing user

        const existingUser = await User.findOne({email});
        if(existingUser){
            res.status(200).json({
                message: "email already exist try another email"
            })
            console.log("email already exist try another email")
            return null
        };

        // path for file
        const avatarLocalPath = req.files?.avatar[0]?.path;
        if(!avatarLocalPath){
            res.status(400).json({
                message: "avatar not uploaded"
            })
            console.log("avatar not uploaded")
           return null
        };
        //uploading on cloundinary
       
        const avatar = await uploadOnCloudinary(avatarLocalPath);
        if(!avatar){
            res.status(400).json({
                message: "photo not uploaded"
            })
            console.log("photo not uploaded")
           return null
        }

        // creating the database 

        const UserDat = await User.create({
            name,
             email, 
             age, 
             password, 
             avatar:avatar.url
        })

        return res.status(200).json({
            message: "data stored in db successfully"
        })
      
}catch(err){
        console.log(err);
    }
}


// login

const UserLogIn = async(req,res)=>{
    // email password
    //check user
    // password compare
    //accescode  and refresh
    //send cookie

    const {email, password} = req.body;
  
    if(!(email  && password)){
        res.status(400).json({
            message: "all field are required"
        })
       return null
    }
    const existingUser = await User.findOne({email})
    if(!existingUser){
        res.status(400).json({
            message: "please signup"
        })
       return null
    }

    // for password
    const isPasswordCorrect = await existingUser.isPasswordCorrect(password)

    if(!isPasswordCorrect){
        res.status(400).json({
            message:"password is not correct"
        })
    }

    const {accessToken, refreshToken} = await generatingAccessAndRefreshTokens(existingUser._id);

    const UserLogedIn = await User.findById(existingUser._id).select("-password")

    // console.log(UserLogedIn)

        // sending cookie 

    const options ={
        httpOnly: true,
        secure: true
    }
    console.log(accessToken, refreshToken)
    return res
    .cookie("accessToken",accessToken, options )
    .cookie("refreshToken",refreshToken, options )
    .json({
        message:"user logged in",
        
        existingUser: UserLogedIn, accessToken, refreshToken
        
 } )
   
}

export {UserReg, UserLogIn}