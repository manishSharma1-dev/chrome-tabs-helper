// this route will be usefull for searching the tabs

import { ConnectDb } from "@/connection/dbConnect"
import { TabModel } from "@/models/tabModel"
import { NextResponse } from "next/server"

export async function POST(req:Request){
    try {
        await ConnectDb()
    
        // note : tags and Keyword are same 
        const { tag } = await req.json()
    
        if(!tag){
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
            keyword : tag
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
    
        return NextResponse.json(
            {
                success : true,
                message : "tabs finded with Keyword",
                tabData
            },
            {
                status : 200
            }
        )
    } catch (error) {
        return NextResponse.json(
            {
                success : false,
                message : "failed to find the User",
                error : error
            },
            {
                status : 500
            }
        )
    }
}