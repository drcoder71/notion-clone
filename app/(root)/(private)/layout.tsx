import { ChildProps } from '@/types'
import React from 'react'
import { Sidebar } from './components'

const PrivateLayout = ({ children }: ChildProps) => {
    return (
        <div className='flex w-full'>
            <Sidebar />
            <main className='flex-1 h-full overflow-y-auto'>{children}</main>
        </div>
    )
}

export default PrivateLayout