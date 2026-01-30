import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest } from 'next/server'
import { createUser } from '@/app/lib/actions/user'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)


    const { id } = evt.data
    const eventType = evt.type
    if (evt.type === 'user.created') {
      const { first_name, last_name, email_addresses, username } = evt.data
      console.log(first_name, last_name, email_addresses, username)

     const user = await createUser(
        first_name as string,
        last_name as string,
        email_addresses[0].email_address as string,
        username as string,
       "https://imgs.search.brave.com/en8GueUwEke4A7ecDjpRnIpFR8Y-WWOEbjzD2xCNTu0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWd2/My5mb3Rvci5jb20v/aW1hZ2VzL2hvbWVw/YWdlLWZlYXR1cmUt/Y2FyZC9mb3Rvci0z/ZC1hdmF0YXIuanBn"
      )
      return new Response(JSON.stringify(user), { status: 200 })
     }  

    
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}

