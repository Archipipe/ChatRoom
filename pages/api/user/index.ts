import prisma from "../../../lib/prisma";
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function createUser(req :NextApiRequest,res :NextApiResponse){

    if (req.method !== "POST"){
        return res.status(400).json({message: "You should use only POST requets", data:""})
    }
    const user = await prisma.user.findUnique({where:{
        id: JSON.parse(req.body)
    }})
    if (!user){
        return res.status(400).json({message: "Didn't find such a user", data:""})
    }
    return res.status(200).json({message: "Success", data: user})
}