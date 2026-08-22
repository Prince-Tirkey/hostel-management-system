import type { Response } from "express";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware.js";
import { MessReview } from "./mess-review.model.js";
import { FoodWastage as Wastage } from "./food-wastage.model.js";

export async function listReviews(_req:AuthenticatedRequest,res:Response){
 const reviews=await MessReview.find({status:"VISIBLE"}).sort({createdAt:-1}).limit(100);
 res.json({success:true,message:"Mess reviews fetched",data:reviews,timestamp:new Date().toISOString()});
}
export async function createReview(req:AuthenticatedRequest,res:Response){
 const review=await MessReview.create({...req.body,studentId:req.user!.userId});
 res.status(201).json({success:true,message:"Mess review submitted",data:review,timestamp:new Date().toISOString()});
}
export async function addWastage(req:AuthenticatedRequest,res:Response){
 const record=await Wastage.create(req.body);
 res.status(201).json({success:true,message:"Food wastage record added",data:record,timestamp:new Date().toISOString()});
}
export async function wastageSummary(_req:AuthenticatedRequest,res:Response){
 const rows=await Wastage.aggregate([{ $group:{ _id:"$hostelId", preparedKg:{$sum:"$preparedKg"}, wastedKg:{$sum:"$wastedKg"}, studentsServed:{$sum:"$studentsServed"} } }]);
 res.json({success:true,message:"Food wastage summary fetched",data:rows,timestamp:new Date().toISOString()});
}
