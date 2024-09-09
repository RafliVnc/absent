import * as userModal from '@/app/api/(modal)/userModal'
import { UserQueryParams } from '@/common/constants/formatParams'
import { UserRole } from '@prisma/client'

export const getAdminWithPagination = async (
  params: UserQueryParams
): Promise<{ rows: userModal.UserWitoutPassword[]; count: number }> => {
  const user = await userModal.getPagination({ ...params, role: UserRole.ADMIN })

  return user
}
