import {prisma} from "../db";
import express from "express";

export async function validateStartVerificationRequest(req:express.Request, res:express.Response, next:express.NextFunction) {
    const { email, handle } = req.body;
    if (!handle || !email) {
        res.status(400).json({ success: false, message: "Missing handle or email." });
        return;
    }
    const User = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if(User?.cfHandle){
        res.status(400).json({success:false,message:"handle for user is already set."});
        return;
    }
    const handleUser = await prisma.user.findUnique({
        where: {
            cfHandle: handle
        }
    });
    if(handleUser){
        res.status(400).json({success:false,message:"handle is already linked to a account"});
        return;
    }
    next();
}