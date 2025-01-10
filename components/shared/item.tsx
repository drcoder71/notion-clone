'use client'

import { Id } from "@/convex/_generated/dataModel"

interface ItemProps {
    label: string,
    id?: Id<"documents">
}

export const Item = ({
    id,
    label
}: ItemProps) => {
    return (
        <div className="group min-h-[27px] text-sm py-1 w-ful hover:bg-primary/5 flex items-center text-muted-foreground font-medium">
            <span className="truncate">{label}</span>
        </div>
    )
}
