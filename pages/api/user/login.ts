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

    // const search = await prisma.user.findFirst({where:{
    //     login: user.login,
    //     password: user.password
    // }})

    // console.log(search)
}