import { LoginResponse } from '@/types/auth'

export const mockLogin = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'admin@test.com' && password === '123456') {
        resolve({
          token: 'mock-jwt-token-123456',
          user: {
            id: 1,
            name: 'Admin User',
            email,
          },
        })
      } else {
        reject(new Error('Invalid credentials'))
      }
    }, 1000)
  })
}
