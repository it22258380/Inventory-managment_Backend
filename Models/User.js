import mongoose from "mongoose";

const UserSchema=mongoose.Schema(
    {
       firstname:{
            type:String,
            required:true
        },
        lastname:{
            type:String,
            required:true
        },
        email:{
            type:String,
            unique:true,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            
        }
        
    }
)

const User = mongoose.model('User',UserSchema);

export default User;