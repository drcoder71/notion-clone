'use client'
import { Id } from "@/convex/_generated/dataModel"
import { ChevronDown, ChevronRight, MoreHorizontal, Plus, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useUser } from "@clerk/nextjs"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Skeleton } from "../ui/skeleton"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface ItemProps {
    label: string,
    id?: Id<"documents">,
    level?: number,
    expanded?: boolean,
    onExpanded?: () => void,
    onClick?: () => void,
    active?: boolean,
    icon?: ReactNode
}

export const Item = ({ id, label, level, expanded, onExpanded, onClick, active, icon: Icon }: ItemProps) => {
    const { user } = useUser()

    const createDocument = useMutation(api.document.createDocs)

    const onCreateDocument = (event: any) => {
        event.stopPropagation()
        if (!id) return
        createDocument({
            title: "Untitled",
            parentDocument: id
        })
    }

    const handleExpand = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation()
        onExpanded?.()
    }

    const ChevronIcon = expanded ? ChevronDown : ChevronRight

    return (
        <div
            style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
            className={cn(
                "group min-h-[27px] my-1  text-sm py-1 pr-3 w-ful hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
                active && "bg-primary/5 text-primary"
            )}
            role="button"
            onClick={onClick}
        >
            {!!id && (
                <div
                    role="button"
                    className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
                    onClick={handleExpand}
                >
                    <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                </div>
            )}
            {
                Icon && <div className="mr-4">{Icon}</div>
            }
            <div role="">{ }</div>
            <span className="truncate">{label}</span>
            {
                !!id && (
                    <div className="ml-auto flex items-center gap-x-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
                                <div role="button" className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1">
                                    <MoreHorizontal className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-60"
                                align="start"
                                side="right"
                                forceMount
                            >
                                <DropdownMenuItem onClick={() => { }}>
                                    <Trash2 className="w-4 h-5 text-muted-foreground" />
                                    Delete
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <div className="text-sm text-muted-foreground p-2">
                                    Last edited by {user?.fullName}
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <div
                            role="button"
                            className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm  hover:bg-neutral-300 dark:bg-neutral-600 "
                            onClick={(event) => onCreateDocument(event)}
                        >
                            <Plus className="h-4 w-4 shrink-0 dark:text-neutral-300 text-neutral-600" />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
    return (
        <div
            style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
            className="flex gap-x-2 py-[3px]"
        >
            <Skeleton className="w-5 h-4" />
            <Skeleton className="w-1/2 h-4" />
        </div>
    )
}