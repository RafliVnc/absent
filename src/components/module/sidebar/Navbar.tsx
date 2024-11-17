'use client'

import React, { useState } from 'react'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserRole } from '@prisma/client'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import ProfileDialog from './ProfileDialog'

export default function Navbar() {
  const [isOpen, setOpen] = useState(false)
  const { user, status } = useCurrentUser()
  const route = useRouter()
  const { toast } = useToast()

  return (
    <header className="sticky top-4 z-10 mx-6 mt-4 flex h-16 items-center justify-end gap-3 rounded-xl bg-white px-10 shadow-custom">
      {status === 'loading' ? (
        <div className="flex items-center space-x-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="lg" className="flex items-center gap-2">
              <div>
                <p className="text-base font-medium">{user?.name} </p>
                <p className="text-end text-xs font-light text-muted-foreground">
                  {user?.role === UserRole.COACH
                    ? 'Pelatih'
                    : user?.role === UserRole.HEADCOACH
                      ? 'Kepala Pelatih'
                      : 'Murid'}
                </p>
              </div>
              <Avatar>
                <AvatarImage src={`${user?.image ?? ''}`} />
                <AvatarFallback>{user?.name ? user.name[0].toLocaleUpperCase() : 'A'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <FontAwesomeIcon icon={faUser} className="mr-2 size-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                signOut({ redirect: true, callbackUrl: '/login' })
                toast({
                  title: 'Logged out !!',
                  variant: 'success',
                  duration: 2000
                })
                route.push('/login')
              }}
            >
              <FontAwesomeIcon icon={faRightToBracket} className="mr-2 size-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <ProfileDialog isOpen={isOpen} setOpen={setOpen} />
    </header>
  )
}
