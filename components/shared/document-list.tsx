'use client'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import React, { useState } from 'react'
import { Item } from './item'
import { cn } from '@/lib/utils'
import { useParams, useRouter } from 'next/navigation'

interface DocumentProps {
    level?: number
    parentDocumentId?: Id<"documents">
}

export const Documentlist = ({ level = 0, parentDocumentId }: DocumentProps) => {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({})
    const router = useRouter()
    const params = useParams()

    const documents = useQuery(api.document.getDocuments, {
        parentDocument: parentDocumentId
    })
    const onExpanded = (parentDocumentId: string) => {
        setExpanded(prev => ({
            ...prev,
            [parentDocumentId]: !prev[parentDocumentId]
        }))
    }

    const onChangeRedirect = (documentId: string) => {
        router.push(`/documents/${documentId}`)
    }

    if (documents === undefined) {
        return (
            <>
                <Item.Skeleton level={level} />
                {
                    level === 0 && (
                        <>
                            <Item.Skeleton level={level} />
                            <Item.Skeleton level={level} />
                        </>
                    )
                }
            </>
        )
    }

    return (
        <div>
            <p
                className={cn(
                    "hidden text-sm font-medium text-muted-foreground/80",
                    expanded && "last:block",
                    level == 0 && "hidden"
                )}
                style={{
                    paddingLeft: level ? `${level * 12 + 25}px` : undefined
                }}
            >No found documents</p>
            {
                documents?.map(document => (
                    <div key={document._id}>
                        <Item
                            label={document.title}
                            id={document?._id}
                            level={level}
                            expanded={expanded[document._id]}
                            onExpanded={() => onExpanded(document._id)}
                            onClick={() => onChangeRedirect(document._id)}
                            active={params.documentId === document._id}
                        />
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
