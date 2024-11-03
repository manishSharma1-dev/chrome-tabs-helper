import mongoose,{ Schema, Document } from "mongoose"

export interface Tab extends Document {
    userId : string;
    title : string;
    keyword : string;
    description : string;
    link? : string;
    created_at? : string; 
}

const TabsSchema:Schema<Tab> = new Schema(
    {
        userId : {
            type : String,
            required : true
        },
        title : {
            type : String,
        },
        keyword : {
            type : String,
            required: true
        },
        description : {
            type : String,
            required : true
        },
        link : {
            type : String,
            required : true
        },
        created_at : {
            type : String
        }
    },
    { timestamps : true }
)

const TabModel = mongoose.models.TabModel as mongoose.Model<Tab> || mongoose.model("TabModel",TabsSchema)

export {
    TabModel
}