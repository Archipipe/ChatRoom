import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../lib/prisma";
export default async function Message(req: NextApiRequest,res :NextApiResponse){
    if (req.method === "GET"){
        let chat = await prisma.chatMessage.findMany();
        if (!chat) res.status(500).json({message: "Can't find any chat messages", data: ""})
        chat = chat.sort((a,b)=>a.id - b.id)
        res.status(200).json({message: "Success", data: chat})
     return    
    }
    else if (req.method === "POST"){
        
        try{
            await prisma.chatMessage.create({data:{
                message : req.body.message,
                authorLogin: req.body.user.login
            }})
            return res.status(200).json({message: "Success", data:""})
        }
        catch(e){
            return res.status(400).json({message: "Something's wrong...", data:e})
        }          
    }
    else{
        res.status(400).json({message:"You should use only GET or POST request", data: ""})
    }
}