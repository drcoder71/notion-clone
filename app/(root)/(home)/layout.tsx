import { Navbar } from '@/components/shared'
import { ChildProps } from '@/types'
import React from 'react'

const RootLayout = ({ children }: ChildProps) => {
    return (
        <>
            <Navbar />
            <main className='relative top-[20vh]'>
                <>{children}</>
            </main>
        </>
    )
}

export default RootLayout