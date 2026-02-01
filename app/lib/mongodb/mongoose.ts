import mongoose from 'mongoose'


const MONGO_DB_URI = process.env.MONGO_DB_URI as string
let initialized = false
export const connectDB = async () => {
    try {
        if (initialized) return
        mongoose.set('strictQuery', true)
        await mongoose.connect(MONGO_DB_URI, {
            dbName: 'next-blog'
         

        })
        initialized = true
        console.log("MongoDB connected")
        return initialized
        

    } catch (e: any) {
        console.log(e, "MongoDB connection error")
        throw new Error(e.message + " MongoDB Connection Failed");

    }
}