'use client'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import React, { useState } from 'react'
import { Item } from './item'

interface DocumentProps {
    level?: number
    parentDocumentId?: Id<"documents">
}

export const Documentlist = ({ level = 0, parentDocumentId
}: DocumentProps) => {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({})

    const onExpanded = (parentDocumentId: string) => {
        setExpanded(prev => ({
            ...prev,
            [parentDocumentId]: !prev[parentDocumentId]
        }))
    }

    const documents = useQuery(api.document.getDocuments, {
        parentDocument: parentDocumentId
    })

    return (
        <div>
            {
                documents?.map(document => (
                    <div key={document._id}>
                        <Item label={document.title} id={document?._id} level={level} expanded={expanded[document._id]} onExpanded={() => onExpanded(document._id)} />
                        {
                            expanded[document._id] && (
                                <Documentlist parentDocumentId={document._id} level={level + 1} />
                            )
                        }
                    </div>
                ))
            }
        </div>
    )
}
