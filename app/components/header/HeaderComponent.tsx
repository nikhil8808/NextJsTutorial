'use client'
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import React,{useState} from 'react'
import {
    Button,
    MegaMenu,
    MegaMenuDropdown,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
    TextInput
} from "flowbite-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LinkComponent from './LinkComponent'
import ThemeToggle from '../ThemeToggle';



const HeaderComponent =  () => {
    const pathName=usePathname()
    const [showProfile,setShowProfile]=useState(false)

    const links=[
        {
            name:"Home",
            path:"/"
        },
        {
            name:"About",
            path:"/about"
        },
        {
            name:"Projects",
            path:"/"
        },
    ]
 


    return (
        <MegaMenu className=''>
             <NavbarBrand >
     
           
                <img alt="" src="/favicon.svg" className="mr-3 h-6 sm:h-9" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">BlogApp</span>
                
           
             </NavbarBrand>
            <div className="order-2 hidden items-center md:flex gap-4">
             <SignedIn>
                <UserButton 
           userProfileMode="modal"
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
              },
            }}
                
                />
                
             </SignedIn>
             <SignedOut>

                <SignInButton
   
                
                
                />
             </SignedOut>
           
            
              
            </div>
            <NavbarToggle />

            <NavbarCollapse className=''>
                <ThemeToggle />
                <TextInput placeholder='Search...' />
                {
                    links?.map((link:any,index:number)=>{

                        return <LinkComponent 
                        key={index}
                        name={link?.name}
                        path={link?.path}
                        active={pathName==link?.path}
                        />
                    })
                }


            </NavbarCollapse>
        </MegaMenu>
    )
}

export default HeaderComponent