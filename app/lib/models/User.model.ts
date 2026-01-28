import mongoose from "mongoose";

const User=new mongoose.Schema({
    clerkId:{type:String,required:true},
     firstName:{type:String,required:true},
     lastName:{type:String,required:true},
     email:{type:String,required:true},
     userName:{type:String,required:true,unique:true},
     profileImage:{type:String,required:true}
     
   

},{ timestamps:true })

export default mongoose.models.User || mongoose.model("User",User);