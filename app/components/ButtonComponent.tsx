import React from 'react'
import { Button } from 'flowbite-react'

interface ButtonComponent{
  title:String
}

const ButtonComponent = ({title}:ButtonComponent) => {

  return (<>  <Button>
    {title}
    </Button></>
  )
}

export default ButtonComponent