'use client'
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react'
import { PlusIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const DocumentsPage = () => {
    const { user } = useUser()
    const createDocuments = useMutation(api.document.createDocs)

    const createDocumentHandle = () => {
        createDocuments({
            title: "New Folder",
        })
    }

    return (
        <div className='h-screen w-full flex items-center justify-center space-y-4 flex-col'>
            <Image src={'/note.svg'} alt='logo' width={300} height={300} className='dark:hidden' />
            <Image src={'/note-dark.svg'} alt='logo' width={300} height={300} className='hidden dark:inline-block' />

            <h2 className='text-lg font-bold '>
                Welcome to <span className='text-green-500'>{user?.firstName}</span>`s document page!
            </h2>

            <Button type="button" onClick={createDocumentHandle}>
                <PlusIcon className='h-4 w-4 mr-2' />
                Create a blank
            </Button>
        </div>
    )
}

export default DocumentsPage
