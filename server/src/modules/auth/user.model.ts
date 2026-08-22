import mongoose,{Schema} from "mongoose";
export const ROLES=["STUDENT","STUDENT_COORDINATOR","MESS_COORDINATOR","WARDEN","ADMIN"] as const;
const schema=new Schema({
 fullName:{type:String,required:true,trim:true},
 email:{type:String,required:true,unique:true,lowercase:true,trim:true},
 passwordHash:{type:String,required:true},
 role:{type:String,enum:ROLES,default:"STUDENT"}
},{timestamps:true});
export const User=mongoose.model("User",schema);
