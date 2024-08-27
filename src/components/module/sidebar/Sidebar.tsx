'use client'

import { Button } from '@/components/ui/button'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <aside
      className={`flex h-screen justify-center ${isOpen ? `w-[15%]` : `w-[4%]`} transition-width transition-width bg-primary p-4 text-white duration-300`}
    >
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon={faBars} className="size-5" />
      </Button>
    </aside>
  )
}
