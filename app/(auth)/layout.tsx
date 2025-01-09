import { ChildProps } from '@/types'
import React from 'react'

const RootLayout = ({ children }: ChildProps) => {
    return (
        <>{children}</>
    )
}

export default RootLayout