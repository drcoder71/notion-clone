'use client'
import Logo from './logo'
import { ModeToggle } from './mode-toggle'
import { Button } from '../ui/button'
import { useScroller } from '@/hooks'
import { cn } from '@/lib/utils'

export const Navbar = () => {
    const scrolled = useScroller()
    return (
        <div className={cn('fixed top-0 z-40 bg-background flex items-center justify-between w-full p-6', scrolled && "border-b")}>
            <Logo />
            <div className='flex items-center gap-x-2'>
                <Button size={'sm'} variant={'ghost'}>Log in</Button>
                <Button size={'sm'}>Get Notion Free</Button>
                <ModeToggle />
            </div>
        </div>
    )
}
