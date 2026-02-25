import { mockLogin } from '@/services/auth/auth.service'
import { LoginFormInput, LoginResponse } from '@/types/auth'
import { create } from 'zustand'

interface AuthState {
  user: LoginResponse['user'] | null
  isAuthenticated: boolean
  login: (data: LoginFormInput) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  isAuthenticated: false,

  login: async ({ email, password }) => {
    const response = await mockLogin(email, password)

    await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ token: response.token }),
    })

    set({
      user: response.user,
      isAuthenticated: true,
    })
  },

  logout: async () => {
    await fetch('/api/logout', { method: 'POST' })

    set({
      user: null,
      isAuthenticated: false,
    })
  },
}))
