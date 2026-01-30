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
       "https://www.gravatar.com/avatar/00000000000000000000000000000000"
      )
      return new Response(JSON.stringify(user), { status: 200 })
     }  

    
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}

