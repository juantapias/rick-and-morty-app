'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import z from 'zod'

import Fields, { FieldError, FieldLabel } from '@/components/ui/fields/Fields'
import Input from '@/components/ui/input/Input'
import { ButtonForm } from '@/components/ui/button/Button'

import { useAuthStore } from '@/store/auth.store'

import styles from './loginform.module.css'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const userLogin = z.object({
  email: z.email('Por favor, introduce un correo electrónico válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

type LoginFormInput = z.infer<typeof userLogin>

export default function LoginForm() {
  const login = useAuthStore(state => state.login)

  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({ resolver: zodResolver(userLogin) })

  const loginSubmit = async (data: LoginFormInput) => {
    setIsLoading(true)
    try {
      const validatedData = userLogin.parse(data)
      login(validatedData)
      router.push('/home')
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error.issues)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit(loginSubmit)}>
      <Fields>
        <FieldLabel htmlFor='email'>Usuario</FieldLabel>
        <Input id='email' type='email' {...register('email')} />
        {errors.email && <FieldError>{errors.email.message}</FieldError>}
      </Fields>

      <Fields>
        <FieldLabel htmlFor='password'>Contraseña</FieldLabel>
        <Input id='password' type='password' {...register('password')} />
        {errors.password && <FieldError>{errors.password.message}</FieldError>}
      </Fields>

      <ButtonForm
        text={isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        size='full'
        disabled={isLoading}
      />

      <div className={styles.loginForgotUser}>
        <Link href='/forgot-password'>¿Olvidaste tu usuario o contraseña?</Link>
      </div>
    </form>
  )
}
