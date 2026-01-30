import UserModel from "../models/User.model";

export const createUser = async (
    clerkId: string,
    firstName: string,
    lastName: string,
    email: string,
    userName: string,
    profileImage: string
) => {
    try {
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
        const user = await UserModel.findOneAndUpdate(
            { clerkId },
            { firstName, lastName, email, userName, profileImage },
            { new: true }
        );
        return user;

    }catch(e:any){
        console.log(e,"Update User Error")
    }

}

export const getUserByClerkId=async(clerkId:string)=>{
    try{
        const user=await UserModel.findOne({clerkId});
        return user;
    }catch(e:any){
        console.log(e,"Get User By ClerkId Error")
    }

}