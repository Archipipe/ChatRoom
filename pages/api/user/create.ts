import prisma from "../../../lib/prisma";
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function createUser(req :NextApiRequest,res :NextApiResponse){

    if (req.method !== "POST"){
        return res.status(400).json({message: "You should use only POST requets", data: ""})
    }
    const user : Prisma.UserCreateInput = {login : req.body.login, password: req.body.password}
    try{
        const if_exist = await prisma.user.findUnique({where:{login: user.login}})
        if (if_exist) return res.status(403).json({message:"Such user is already exists", data:""});
        const create_user = await prisma.user.create({data: user})
        return res.status(200).json({message: "New user was created", data: create_user})
     } catch (e){
           return res.status(400).json({message: `An error is occured`, data: e})
     }
}