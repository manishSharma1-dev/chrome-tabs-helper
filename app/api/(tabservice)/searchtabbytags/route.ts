// this route will be usefull for searching the tabs

import { ConnectDb } from "@/connection/dbConnect"
import { TabModel } from "@/models/tabModel"
import { NextResponse } from "next/server"
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(req:Request){
    await ConnectDb()

    const { getUser } = getKindeServerSession();
        
    const user = await getUser();

    if(!user){
        console.log("User is not Logged in")
    }

    const ID = await user?.id

    // note : tags and Keyword are same 

    const { tags } = await req.json()

    if(!tags){
        return NextResponse.json(
            {
                success : false,
                message: "Tags must be passed for Search"
            },
            {
                status : 400
            }
        )
    }

    const tabData = await TabModel.find({
        userId : ID,
        keyword : tags
    })

    if(!tabData){
        return NextResponse.json(
            {
                success : false,
                message: "Tab isn't valid"
            },
            {
                status : 400
            }
        )
    }




}