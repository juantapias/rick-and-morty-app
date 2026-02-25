'use client'

import { redirect } from 'next/navigation'

import LoginForm from '@/components/forms/login-form/LoginForm'
import { Card, CardHeader, CardBody } from '@/components/ui/card/Card'

import { useAuthStore } from '@/store/auth.store'

import Logo from '@/components/ui/logo/Logo'

export default function LoginPage() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  if (isAuthenticated) {
    redirect('/home')
  }

  return (
    <main className='login'>
      <Card>
        <CardHeader>
          <Logo />
        </CardHeader>

        <CardBody>
          <LoginForm />
        </CardBody>
      </Card>
    </main>
  )
}
