'use client'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useConvexAuth } from 'convex/react'
import { SignInButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Loader } from '../ui/loader'

export const Heroes = () => {
    const { isAuthenticated, isLoading } = useConvexAuth()
    return (
        <>
            <div className='max-w-3xl space-y-4 '>
                <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>Write, plan, share. With AI at your side.</h1>
                <h3 className='text-base sm:text-xl md:text-2xl font-medium'>Notion is the connected workspace where better, faster work happens.</h3>
                {
                    isLoading && (
                        <div className='w-full  flex justify-center'>
                            <Button size='lg' asChild>
                                <Loader />
                            </Button>
                        </div>
                    )
                }
                {
                    !isAuthenticated && !isLoading && (
                        <SignInButton mode='modal'>
                            <Button >
                                Get Notion Free <ArrowRight className='h-4 w-4 ml-2' />
                            </Button>
                        </SignInButton>
                    )
                }
                {
                    isAuthenticated && !isLoading && (
                        <Button size='lg' asChild>
                            <Link href='/documents'>
                                Enter Notion <ArrowRight className='h-4 w-4 ml-2' />
                            </Link>
                        </Button>
                    )
                }
            </div>
            <div className='flex flex-col items-center justify-center max-w-5xl'>
                <div className='flex items-center'>
                    <div className='relative w-[400px] h-[400px] hidden md:block'>
                        <Image src={'/men.svg'} alt='men' fill className='dark:hidden' />
                        <Image src={'/men-dark.svg'} alt='men' fill className='hidden dark:block' />
                    </div>
                </div>
            </div>
        </>
    )
}
