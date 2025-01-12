'use client'
import { Id } from '@/convex/_generated/dataModel'

interface DocumentIdProps {
    params: {
        documentId: Id<"documents">
    }
}

const DocumentIdPage = ({ params }: DocumentIdProps) => {
    return (
        <div className='p-4'>Document id: {params?.documentId}</div>
    )
}

export default DocumentIdPage