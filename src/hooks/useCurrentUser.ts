import { userDummy } from '@/common/constants/dummy'
import { useSession } from 'next-auth/react'

export const useCurrentUser = () => {
  const { data: session, status } = useSession()

  if (!session) return { user: userDummy, status }

  return { user: session?.user, status }
}
