'use client'
import { cn } from '@/lib/utils'
import { ChevronsLeftIcon, MenuIcon } from 'lucide-react'
import React, { MouseEvent, useRef, useState } from 'react'

export const Sidebar = () => {
    const sidebarRef = useRef<HTMLDivElement>(null)
    const navbarRef = useRef<HTMLDivElement>(null)
    const isResizing = useRef(false)

    const [isCollapsed, setCollapsed] = useState(false)
    const [isReseted, setReseted] = useState(false)

    const collapseHandler = () => {
        if (sidebarRef.current && navbarRef.current) {
            setCollapsed(true)
            setReseted(true)

            sidebarRef.current.style.width = "0"
            navbarRef.current.style.width = "100%"
            navbarRef.current.style.left = "0"
            setTimeout(() => setReseted(false), 300)
        }
    }

    const reset = () => {
        if (sidebarRef.current && navbarRef.current) {
            setCollapsed(false)
            setReseted(true)

            sidebarRef.current.style.width = "240px"
            navbarRef.current.style.width = "calc(100% - 240px)"
            navbarRef.current.style.left = "240px"
            setTimeout(() => setReseted(false), 300)
        }
    }

    const handleMouseEvent = (event: any) => {
        event.preventDefault()
        event.stopPropagation()

        isResizing.current = true
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
    }

    const handleMouseMove = (event: any) => {
        if (!isResizing) return
        let newWith = event.clientX

        if (newWith < 240) newWith = 240
        if (newWith > 500) newWith = 500

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWith}px`
            navbarRef.current.style.width = `calc(100% - ${newWith}px)`
            navbarRef.current.style.left = `${newWith}px`
        }
    }

    const handleMouseUp = () => {
        isResizing.current = false
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        setTimeout(() => setReseted(false), 300)
    }

    return (
        <>
            <div ref={sidebarRef} className={cn('w-60 h-screen flex flex-col relative bg-secondary overflow-y-auto z-50 group/sidebar', isReseted && "transition-all ease-in duration-300")}>
                <div className='w-6 h-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-3 opacity-0 group-hover/sidebar:opacity-100 transition' role='button' onClick={collapseHandler}>
                    <ChevronsLeftIcon />
                </div>
                <div className="absolute right-0 top-0 w-1 h-full cursor-ew-resize bg-primary/10 opacity-0 group-hover/sidebar:opacity-100 transition" onMouseDown={handleMouseEvent}></div>
            </div>
            <div className={cn('absolute top-0 left-60 z-50 w-[calc(100% - 240px)] ', isReseted && "transition-all ease-in duration-300")} ref={navbarRef}>
                <nav className='bg-transparent py-2 px-3 w-full'>
                    {
                        isCollapsed && (
                            <MenuIcon className='w-6 h-6 text-muted-foreground' role='button' onClick={reset} />
                        )
                    }
                </nav>
            </div>
        </>
    )
}
