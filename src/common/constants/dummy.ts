import { EventType, FeeType, UserRole } from '@prisma/client'

export const userDummy = {
  id: '',
  name: '',
  email: '',
  role: UserRole.ATHLETE,
  image: ''
}

export const FeeDummy = {
  id: 0,
  name: '',
  amount: 0,
  type: FeeType.INCOME,
  createdAt: new Date(),
  updatedAt: new Date()
}

export const EventDummy = {
  id: 0,
  title: 'Dummy Event',
  type: EventType.TOURMNAMENT,
  location: 'Pekanbaru',
  description: '',
  date: new Date().toDateString(),
  startTime: '13:00',
  endTime: '21:00',
  startDate: new Date().toDateString(),
  endDate: new Date().toDateString(),
  image: 'test',
  grade: 'Grade 1',
  place: 'Gor Gelanggang Remaja',
  createdAt: new Date().toDateString(),
  updatedAt: new Date().toDateString()
}
