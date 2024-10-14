'use client'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UserRole } from '@prisma/client'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { menu, MenuProps } from '@/common/constants/menu'
import { cn } from '@/lib/utils'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const route = useRouter()
  const location = usePathname()
  const { user } = useCurrentUser()

  const authorizeMenu: MenuProps[] = menu.filter(item => item.access.includes(user?.role as UserRole))

  return (
    <aside
      className={cn(
        'transition-width flex min-h-screen bg-primary py-4 text-white duration-300 ease-in-out',
        isOpen ? 'w-[15%]' : 'w-[5%]'
      )}
    >
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full items-center justify-center">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="mb-2">
            <FontAwesomeIcon icon={faBars} className="size-5" />
          </Button>
        </div>
        {authorizeMenu.map(({ label, link, icon }) => (
          <TooltipProvider key={label} delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild className="mx-auto w-[70%]">
                <Button
                  variant="uncenter"
                  className={location === link ? 'bg-primary-foreground text-left text-primary' : ''}
                  size={isOpen ? 'default' : 'icon'}
                  onClick={() => route.push(link)}
                >
                  <FontAwesomeIcon icon={icon} className="size-5" />
                  {isOpen && <p className="ml-2">{label}</p>}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className={`ml-2 ${isOpen && 'hidden'}`}>
                <p>{label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </aside>
  )
}
