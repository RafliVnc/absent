import { userDummy } from '@/common/constants/dummy'
import { useSession } from 'next-auth/react'

export const useCurrentUser = () => {
  const { data: session, status, update } = useSession()

  if (!session) return { user: userDummy, status, update }

  return { user: session.user, status, update }
}
