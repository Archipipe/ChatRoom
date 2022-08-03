import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../lib/prisma";
import { Prisma } from "@prisma/client";

export default async  function Login(req : NextApiRequest,res : NextApiResponse){
    
    if (req.method !== "POST"){
       return  res.status(400).json({message: "You can only use GET request", data:""})
    }

    const user = {
        login : req.body.login,
        password: req.body.password
    }

    const search = await prisma.user.findFirst({where:{
        login: user.login,
        password: user.password
    }})

    if (!search) return res.status(400).json({message: "Didn't find such a user", data: ""});
    res.status(200).json({message: "Success", data: search.id})
}