import { UserRole } from '@prisma/client'
import { faCalendarDay, faHouse, faMoneyBill, faUserGroup, faUsersGear } from '@fortawesome/free-solid-svg-icons'

export interface MenuProps {
  label: string
  link: string
  icon: any
  access: UserRole[]
}

export const menu: MenuProps[] = [
  {
    label: 'Dashboard',
    link: '/home',
    icon: faHouse,
    access: [UserRole.ATHLETE, UserRole.COACH, UserRole.HEADCOACH]
  },
  {
    label: 'Acara',
    link: '/event',
    icon: faCalendarDay,
    access: [UserRole.COACH, UserRole.HEADCOACH]
  },
  {
    label: 'Atlet',
    link: '/athlete',
    icon: faUsersGear,
    access: [UserRole.COACH, UserRole.HEADCOACH]
  },
  {
    label: 'Pelatih',
    link: '/coach',
    icon: faUserGroup,
    access: [UserRole.HEADCOACH]
  },
  {
    label: 'Pembayaran',
    link: '/fee',
    icon: faMoneyBill,
    access: [UserRole.COACH, UserRole.HEADCOACH]
  }
]
