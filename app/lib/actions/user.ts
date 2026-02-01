import UserModel from "../models/User.model";
import { connectDB } from "../mongodb/mongoose";

export const createUser = async (
    clerkId: string,
    firstName: string,
    lastName: string,
    email: string,
    userName: string,
    profileImage: string
) => {
    try {
        
        await connectDB();
        const user = await UserModel.create({
            clerkId,
            firstName, 
            lastName, 
            email,
            userName,
            profileImage
        });

        return user;

    } catch (e: any) {
        console.log(e, "Create User Error")
    }

}

export const updateUser =async (
    clerkId:string,
    firstName?:string,
    lastName?:string,
    email?:string,
    userName?:string,
    profileImage?:string
)=>{
    try{
        await connectDB();
        console.log("Updating User with clerkId:", clerkId);
        const user=await UserModel.findOne({clerkId});
        if(!user){
            throw new Error("User not found");
        }
        console.log("Current User Data:", user);
        if(firstName)user.firstName=firstName;
        if(lastName)user.lastName=lastName;
        if(email)user.email=email;
        if(userName)user.userName=userName;
        if(profileImage)user.profileImage=profileImage;
        await user.save();
    


        console.log("Updated User:", user);

        return user;

    }catch(e:any){
        console.log(e,"Update User Error")
    }

}

export const getUserByClerkId=async(clerkId:string)=>{
    try{
        let isDBConnected = await connectDB();
        if (!isDBConnected) {
            throw new Error("Failed to connect to database");
        }
        const user=await UserModel.findOne({clerkId});
        return user;
    }catch(e:any){
        console.log(e,"Get User By ClerkId Error")
    }

}

export const deleteUserByClerkId=async(clerkId:string)=>{
    try{
        let isDBConnected = await connectDB();
        if (!isDBConnected) {
            throw new Error("Failed to connect to database");
        }
        const result=await UserModel.deleteOne({clerkId});
        return result;
    }catch(e:any){
        console.log(e,"Delete User By ClerkId Error")
    }
}