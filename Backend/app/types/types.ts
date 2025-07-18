export interface User {
  id: number
  name: string
  email: string
  password: string
  createdAt: string
}

/**
 * Contact interface - represents a customer contact
 */
export interface Contact {
  id: number
  name: string
  email: string
  phone: string
  userId: number // Foreign key reference to User
  createdAt: string
}

/**
 * Additional types for future API integration
 */
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}
