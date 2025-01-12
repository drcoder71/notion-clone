import React from 'react'
import { PriceCard } from './price-card'
import Image from 'next/image'
import { CARDS } from '@/constants'

const teams = [
    "/teams/1.svg",
    "/teams/2.svg",
    "/teams/3.svg",
    "/teams/4.svg",
    "/teams/5.svg",
]

export const Pricing = () => {
    return (
        <div className='mx-auto container py-6 max-w-7xl sm:max-w-6xl'>
            <h1 className='max-w-2xl font-bold text-2xl sm:text-3xl md:text-4xl'>One tool for your whole company. Free for teams to try.</h1>
            <p className='opacity-70 upppercase'>TRUSTED BY TEAMS AT</p>
            <div className='flex flex-row gap-4 flex-wrap mt-4'>
                {
                    teams.map((team, idx) => (
                        <Image src={team} alt='team partners' width={50} height={50} key={idx} />
                    ))
                }
            </div>
            <div className='mt-6'>
                <div className='space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0'>
                    {
                        CARDS.map(({ title, subtitle, price, priceId, options }, idx) => (
                            <PriceCard key={idx} title={title} subtitle={subtitle} price={price} priceId={priceId} options={options} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}