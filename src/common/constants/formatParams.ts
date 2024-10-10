import { UserRole } from '@prisma/client'

export interface DefaultQueryParams {
  page?: number
  perPage?: number
}

export interface UserQueryParams extends DefaultQueryParams {
  role?: UserRole
}

export interface TuitionQueryParams extends DefaultQueryParams {}
