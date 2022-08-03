import prisma from "../../../lib/prisma";
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function createUser(req :NextApiRequest,res :NextApiResponse){

    if (req.method !== "GET"){
        return res.status(400).json({message: "You should use only GET requets"})
    }
}