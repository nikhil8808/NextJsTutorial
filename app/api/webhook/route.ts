import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'
import { createUser, updateUser,deleteUserByClerkId } from '@/app/lib/actions/user'
import { clerkClient } from '@clerk/nextjs/server'
import UserModel from '@/app/lib/models/User.model'
import { connectDB } from '@/app/lib/mongodb/mongoose'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {


    const evt = await verifyWebhook(req)
    const client = await clerkClient()



    if (evt.type === 'user.created') {

      const { first_name, last_name, email_addresses, username, id } = evt.data

      const user = await createUser(
        id as string,
        first_name as string,
        last_name as string,
        email_addresses[0].email_address as string,
        username as string,
        'https://imgs.search.brave.com/en8GueUwEke4A7ecDjpRnIpFR8Y-WWOEbjzD2xCNTu0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWd2/My5mb3Rvci5jb20v/aW1hZ2VzL2hvbWVw/YWdlLWZlYXR1cmUt/Y2FyZC9mb3Rvci0z/ZC1hdmF0YXIuanBn'
      )

      await client.users.updateUser(id, {
        publicMetadata: {
          userMongoId: user._id.toString(),
          isAdmin: Boolean(user.isAdmin),
        },
      })


      return new Response(JSON.stringify(user), { status: 200 })
    }


    if (evt.type === 'user.updated') {

      const { id } = evt.data

      const clerkUser = await client.users.getUser(id as string)
      console.log("UPDATE EVENT TRIGGERED")
      console.log("CLERK USER UPDATE DATA:", clerkUser)
      const user = await updateUser(
        id as string,
        clerkUser.firstName as string,
        clerkUser.lastName as string,
        clerkUser.emailAddresses[0].emailAddress as string,
        clerkUser.username as string,
        clerkUser.imageUrl as string

      )
      console.log("UPDATED USER DATA:", user)


      return new Response(JSON.stringify(user), { status: 200 })
    }

    if (evt.type === 'user.deleted') {
      // Handle user.deleted event if needed
      const { id } = evt.data
      // const clerkUser = await client.users.getUser(id as string)
      // if(!clerkUser){
      //      return new Response('User Not Found ', { status: 404 })
      // }
      const deleteResult=await deleteUserByClerkId(id as string);


      if(!deleteResult?.deletedCount){
           return new Response('Error Deleting User', { status: 500 })
      }

      console.log(`User with ID ${id} has been deleted.`)



      return new Response('USER Deleted Successfully', { status: 200 })

    }

    // ✅ IMPORTANT: respond for all other event types
    return new Response('Event ignored', { status: 200 })

  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}
