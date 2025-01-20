import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { TrashIcon, UndoIcon } from 'lucide-react'

export const ArchiveBox = () => {
    const archiveDocuments = useQuery(api.document.getArchiveDocuments)
    return (
        <Popover>
            <PopoverTrigger asChild>
                <h3 className='text-xl font-medium'>Archive</h3>
                <p>
                    {
                        archiveDocuments?.length ? archiveDocuments.length : 0
                    }
                </p>
            </PopoverTrigger>
            <PopoverContent className='flex items-start flex-col gap-y-2' asChild>
                {
                    archiveDocuments?.map(document => (
                        <div key={document._id} className='flex items-center justify-between'>
                            <h4 className='text-md font-normal text-muted-foreground'>{document.title}</h4>
                            <div className='flex items-center gap-x-2'>
                                <div
                                    role="button"
                                    className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm  hover:bg-neutral-300 dark:bg-neutral-600 "
                                    onClick={() => { }}
                                >
                                    <UndoIcon className="h-4 w-4 shrink-0 dark:text-neutral-300 text-neutral-600" />
                                </div>
                                <div
                                    role="button"
                                    className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm  hover:bg-neutral-300 dark:bg-neutral-600 "
                                    onClick={() => { }}
                                >
                                    <TrashIcon className="h-4 w-4 shrink-0 dark:text-neutral-300 text-neutral-600" />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </PopoverContent>
        </Popover>
    )
}
