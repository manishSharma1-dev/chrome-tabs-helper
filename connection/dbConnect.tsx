import mongoose from "mongoose";

type ConnectedObject = {
    isConnected? : number
}

const connection:ConnectedObject = {}   // created an object connection

export async function ConnectDb() : Promise<void>{
    if(connection.isConnected){

    } else {
        try {

            const mongoConnectionString = process.env.MONGO_URI
            const dbCollectionName = process.env.COLLECTION_NAME

            const db = await mongoose.connect(`${mongoConnectionString}${dbCollectionName}`)

            connection.isConnected = db.connections[0].readyState
            
            console.log("mongo db is already Connected")
            
        } catch (error) {
            console.error("An Error Occured While COnnecting to the Database",error)
        }
    }
}