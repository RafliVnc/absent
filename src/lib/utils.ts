import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const api = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options
    })

    if (!response.ok) {
      const { errors = [] } = await response.json()
      const errorMessage = errors.map((e: Error) => e.message).join(', ') || 'Internal Server Error'
      throw new Error(errorMessage)
    }

    return await response.json()
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Internal Server Error')
  }
}
