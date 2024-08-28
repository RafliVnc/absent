'use client'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { faBars, faHouse, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const menu = [
  {
    label: 'Home',
    link: '/home',
    icon: faHouse
  },
  {
    label: 'Admin',
    link: '/admin',
    icon: faUser
  }
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const route = useRouter()

  return (
    <aside
      className={`flex min-h-screen justify-center ${isOpen ? `w-[15%]` : `w-[4%]`} transition-width transition-width bg-primary p-4 text-white duration-300`}
    >
      <div className="fixed flex flex-col items-center justify-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="mb-2">
          <FontAwesomeIcon icon={faBars} className="size-5" />
        </Button>
        {menu.map(({ label, link, icon }) => (
          <TooltipProvider key={label} delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size={isOpen ? 'sm' : 'icon'} onClick={() => route.push(link)}>
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
