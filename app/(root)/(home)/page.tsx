import { Clients, Heroes, Pricing } from '@/components/shared'
import React from 'react'

const HomePage = () => {
    return (
        <div className='min-w-full flex flex-col '>
            <div className='flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10'>
                <Heroes />
                <Clients />
            </div>
            <Pricing />
        </div>
    )
}

export default HomePage