import type {NextFunction,Response} from "express";
import type {AuthenticatedRequest} from "./auth.middleware.js";
export function requireRole(...roles:string[]){
 return (req:AuthenticatedRequest,res:Response,next:NextFunction)=>{
  if(!req.user||!roles.includes(req.user.role)) return res.status(403).json({success:false,message:"Not authorized",data:null,timestamp:new Date().toISOString()});
  next();
 };
}
