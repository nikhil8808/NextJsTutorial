import React from 'react'
import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
  return (
  <>
  <div className='w-full h-full md:my-20 flex flex-col items-center justify-center'>
      <SignIn />
  </div>
  
  </>
  )
}

export default SignInPage