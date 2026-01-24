import React from 'react'
import Link from 'next/link'
import { NavbarLink,NavbarBrand } from 'flowbite-react'

interface LinkComponentProps{
    path:any,
    name:String,
    active:boolean
}

const LinkComponent = ({path="",name,active=false}:LinkComponentProps) => {
  return (
    <Link
      href={path}
       className="md:mt-3 py-3 md:py-0"
    >
      {name}
    </Link>
  )
}

export default LinkComponent