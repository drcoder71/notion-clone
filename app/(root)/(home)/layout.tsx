import { Navbar } from '@/components/shared'
import { Footer } from '@/components/shared/footer'
import { ChildProps } from '@/types'
import React from 'react'

const HomeLayout = ({ children }: ChildProps) => {
    return (
        <>
            <Navbar />
            <main className='mt-[20vh]'>
                <>{children}</>
            </main>
            <Footer />
        </>
    )
}

export default HomeLayout