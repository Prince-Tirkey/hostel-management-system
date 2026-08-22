import type { Response } from "express";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware.js";
import { LendItem, BorrowRequest } from "./lend-item.model.js";

export async function listItems(_req: AuthenticatedRequest,res:Response){
  const items=await LendItem.find({status:"AVAILABLE"}).sort({createdAt:-1});
  res.json({success:true,message:"Lend & borrow items fetched",data:items,timestamp:new Date().toISOString()});
}
export async function createItem(req:AuthenticatedRequest,res:Response){
  const item=await LendItem.create({...req.body,ownerId:req.user!.userId});
  res.status(201).json({success:true,message:"Item listed",data:item,timestamp:new Date().toISOString()});
}
export async function requestItem(req:AuthenticatedRequest,res:Response){
  const request=await BorrowRequest.create({...req.body,itemId:req.params.itemId,borrowerId:req.user!.userId});
  res.status(201).json({success:true,message:"Borrow request submitted",data:request,timestamp:new Date().toISOString()});
}
