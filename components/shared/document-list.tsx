'use client'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import React from 'react'
import { Item } from './item'

interface DocumentProps {
    level?: number
    parentDocumentId?: Id<"documents">
}

export const Documentlist = ({
    level,
    parentDocumentId
}: DocumentProps) => {
    const documents = useQuery(api.document.getDocuments, {
        parentDocument: parentDocumentId
    })

    return (
        <div>
            {
                documents?.map(document => (
                    <Item key={document._id} label={document.title} id={document?._id} />
                ))
            }
        </div>
    )
}
