'use client'
import Logo from './logo'
import { ModeToggle } from './mode-toggle'
import { Button } from '../ui/button'
import { useScroller } from '@/hooks'
import { cn } from '@/lib/utils'
import { SignInButton, UserButton } from '@clerk/nextjs'
import { useConvexAuth } from 'convex/react'
import Link from 'next/link'
import { Loader } from '../ui/loader'

export const Navbar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth()
    const scrolled = useScroller()
    return (
        <div className={cn('fixed top-0 z-40 bg-background flex items-center justify-between w-full p-6', scrolled && "border-b")}>
            <Logo />
            <div className='flex items-center gap-x-2'>
                {isLoading && <Loader size={'lg'} />}
                {
                    !isAuthenticated && !isLoading && (
                        <>
                            <SignInButton mode="modal">
                                <Button size={'sm'} variant={'ghost'}>Log in</Button>
                            </SignInButton>
                            <SignInButton mode='modal'>
                                < Button size={'sm'}>Get Notion Free</Button>
                            </SignInButton>
                        </>
                    )

                }
                {
                    isAuthenticated && !isLoading && (
                        <>
                            <Button variant='ghost' size='sm' asChild>
                                <Link href={'/documents'}>Enter Notion</Link>
                            </Button>
                            <UserButton />
                        </>
                    )
                }
                <ModeToggle />
            </div>
        </div>
    )
}
