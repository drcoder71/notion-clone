'use client'
import { SignOutButton, useUser } from '@clerk/nextjs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { ChevronsUpDown } from 'lucide-react'

export const UserBox = () => {
    const { user } = useUser()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div
                    role='button'
                    className='flex items-center text-sm p-3 w-full hover:bg-primary/5'
                >
                    <div className='flex gap-x-2 items-center max-w-[150px]'>
                        <Avatar className='w-7 h-7'>
                            <AvatarImage src={user?.imageUrl} />
                            <AvatarFallback >NC</AvatarFallback>
                        </Avatar>
                        <span className='text-start font-medium line-clamp-1'>
                            {user?.firstName}&apos;s Notion
                        </span>
                    </div>
                    <ChevronsUpDown className='ml-2 text-muted-foreground h-4 w-4' />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className='w-80'
                align='start'
                alignOffset={1}
                forceMount
            >
                <div className='flex flex-col space-y-4 p-2'>
                    <p className='text-xs font-medium leading-none text-muted-foreground'>
                        {user?.emailAddresses[0].emailAddress}
                    </p>
                    <div className='flex items-center gap-x-2'>
                        <div className='rounded-sm bg-secondary p-1'>
                            <Avatar className='w-8 h-8'>
                                <AvatarImage src={user?.imageUrl} />
                            </Avatar>
                        </div>
                        <p className='space-y-1'>
                            <span className='text-sm line-clamp-1 '>{user?.fullName}</span>
                        </p>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild
                    className='w-full cursor-pointer text-muted-foreground'
                >
                    <SignOutButton redirectUrl='/'>Log out</SignOutButton>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
