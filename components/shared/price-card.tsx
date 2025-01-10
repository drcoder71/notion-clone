'use client'
import { CardType } from '@/types'
import { Button } from '../ui/button'
import { CheckCheck } from 'lucide-react'
import { useConvexAuth } from 'convex/react'
import Link from 'next/link'
import { SignInButton } from '@clerk/nextjs'
import { Loader } from '../ui/loader'

export const PriceCard = ({
    title, subtitle, options, price
}: CardType) => {
    const { isAuthenticated, isLoading } = useConvexAuth()
    return (
        <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
            <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">{subtitle}</p>
            <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">
                    {price !== 'Free' && '$'}
                    {price}
                </span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
            </div>
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
                            Start Free
                        </Button>
                    </SignInButton>
                )
            }
            {
                isAuthenticated && !isLoading && (
                    <Button size='lg' asChild>
                        <Link href='/documents'>
                            Start Notion
                        </Link>
                    </Button>
                )
            }
            <ul role="list" className="mb-8 space-y-4 text-left mt-6">
                {
                    options.split(',').map((option, idx) => (
                        <li key={idx} className="flex items-center space-x-3">
                            <CheckCheck className='text-green-500' />
                            <span>{option}</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
