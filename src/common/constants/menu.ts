import { UserRole } from '@prisma/client'
import {
  faCalendarDay,
  faHouse,
  faMoneyBill,
  faUserGroup,
  faUsersGear
} from '@fortawesome/free-solid-svg-icons'

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
    label: 'Pelatih',
    link: '/admin',
    icon: faUserGroup,
    access: [UserRole.SUPERADMIN]
  },
  {
    label: 'Acara',
    link: '/event',
    icon: faCalendarDay,
    access: [UserRole.ADMIN, UserRole.SUPERADMIN]
  },
  {
    label: 'Murid',
    link: '/student',
    icon: faUsersGear,
    access: [UserRole.ADMIN, UserRole.SUPERADMIN]
  },
  {
    label: 'Pembayaran',
    link: '/tuition',
    icon: faMoneyBill,
    access: [UserRole.ADMIN, UserRole.SUPERADMIN]
  }
]
