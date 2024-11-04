import { ConnectDb } from "@/connection/dbConnect"
import { TabModel } from "@/models/tabModel"
import { NextResponse } from "next/server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function POST(req : Request) {
    
    // steps 
    // 1 - take the dat afiedld from the users
    // 2 - caheck if they are valid 
       // 2.4 - get the logged in user detail
       // 2.7 - add the logged in user id int the newtabData
    // 3 - get the image url -> skip for now
    // 4 - check if itis valid -> skip fpr now
    // 4 - create a new Date 
    // 5 - add the data to the db
    // 6 - check if it added Successfully
    // 7 - save it and return an response

    // NOTE -> Keywors are just like tags
    
    try {

        await ConnectDb()

        const { title ,keyword ,description,link } = await req.json()

        const isValid = [title,keyword,description,link].some((field) => {
            field.trim() == ""
        })

        if(isValid){
            console.log("Field must be Valid")
        }

        const {getUser} = getKindeServerSession();
        const user = await getUser();

        if(!user){
            console.log("User not logged in")
        }

        const ID = await user?.id

        const date = new Date()

        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'long', 
            year: 'numeric',  
            month: '2-digit',
            day: '2-digit'  
        });

        // const formattedData = date.getUTCDate()

        const newTabData = await TabModel.create({
            userId : ID,
            title : title,
            keyword : keyword,
            description : description,
            link : link,
            created_at : formattedDate
        })

        const newTabDateexitsinDB = await TabModel.findById(newTabData?._id)

        if(!newTabDateexitsinDB){
            console.log("New Tab Data doesn't added to the DB")
        }

        await newTabData.save({ validateBeforeSave : true })

        return NextResponse.json(
            {
                success : true,
                message : "new Tab Data Added to the DB",
            },
            {
                status : 201
            }
        )

    } catch (error) {
        return NextResponse.json(
            {
                success : false,
                message : "Failed to add new Tab Data Added to the DB",
                error
            },
            {
                status : 500
            }
        )
    }
}