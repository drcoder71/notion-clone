import React from 'react'
import Logo from './logo'
import { Button } from '../ui/button'

export const Footer = () => {
    return (
        <div className='w-full flex items-center justify-between p-6 bg-background z-40'>
            <Logo />
            <div className='flex items-center justify-between gap-x-2 w-full md:ml-auto md:justify-end text-muted-foreground'>
                <Button variant='ghost' size='sm'>Privacy Policy</Button>
                <Button variant='ghost' size='sm' >Terms & Conditions</Button>
            </div>
        </div>
    )
}
