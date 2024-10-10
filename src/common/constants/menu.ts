import { UserRole } from '@prisma/client'
import { faCalendarDay, faHouse, faUser } from '@fortawesome/free-solid-svg-icons'

export interface MenuProps {
  label: string
  link: string
  icon: any
  access: UserRole[]
}

export const menu: MenuProps[] = [
  {
    label: 'Home',
    link: '/home',
    icon: faHouse,
    access: [UserRole.USER, UserRole.ADMIN, UserRole.SUPERADMIN]
  },
  {
    label: 'Admin',
    link: '/admin',
    icon: faUser,
    access: [UserRole.SUPERADMIN]
  },
  {
    label: 'Iuran',
    link: '/tuition',
    icon: faCalendarDay,
    access: [UserRole.ADMIN, UserRole.SUPERADMIN]
  }
]
