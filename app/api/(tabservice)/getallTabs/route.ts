// this route will get all the tabs of the logged in User

import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { ConnectDb } from "@/connection/dbConnect"
import { TabModel } from "@/models/tabModel"
import { NextResponse } from "next/server"

export async function GET(req:Request){       
    try {

        await ConnectDb()

        const { getUser } = getKindeServerSession();
        
        const user = await getUser();

        if(!user){
            console.log("User is not Logged in")
        }

        const ID = await user?.id

        const alltabofUser = await TabModel.find(
            {
                userId : ID
            }
        )

        if(!alltabofUser){
            console.log("NO tab saved by the user")
        }

        return NextResponse.json(
            {
                success : true,
                message : "found User details",
                alltabofUser
            },
            {
                status : 200
            }
        )

    } catch (error) {
        return NextResponse.json(
            {
                success : false,
                message : "Didn't get the Tab Added by the users",
                error
            },
            {
                status : 500
            }
        )
    }
}