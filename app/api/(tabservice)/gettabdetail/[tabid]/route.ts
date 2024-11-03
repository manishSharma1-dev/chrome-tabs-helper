// this route is made to get the full detail why u add a tab 
import { ConnectDb } from "@/connection/dbConnect"
import { TabModel } from "@/models/tabModel"
import { NextResponse } from "next/server"
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET(req:Request,{ params } : { params : any } ) {
    try {
        await ConnectDb()
        const tabid = await params 
    
        const {isAuthenticated} = getKindeServerSession();
        const isUserAuthenticated = await isAuthenticated();
    
        if(isUserAuthenticated == false){
            return NextResponse.json(
                {
                    success : false,
                    message: "user need to be login"
                },
                {
                    status : 400
                }
            )
        }
    
        if(!tabid){
            console.log("user must provide the tabid params")
        }
    
        const tabData = await TabModel.findById(tabid)
    
        if(!tabData){
            console.log("Tab Id isn't Valid")
        }
    
        return NextResponse.json(
            {
                success : true,
                message : "tab data fetched",
                tabData
            },
            { 
                status : 200
            }
        )
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message : "Faield to get the tab Data",
                error
            },
            {
                status: 500
            }
        )
    }
}