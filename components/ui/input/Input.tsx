import { useState } from 'react'

import { Eye, EyeClosed } from 'lucide-react'

import styles from './input.module.css'

export default function Input({
  id,
  name,
  type,
  placeholder,
  ...props
}: {
  id?: string
  name?: string
  type: 'text' | 'password' | 'email'
  placeholder?: string
}) {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <div className={styles.inputContainer}>
      <input
        id={id}
        type={type === 'password' && showPassword ? 'text' : type}
        placeholder={placeholder}
        name={name}
        {...(type === 'email' ? { autoComplete: 'email' } : {})}
        className={styles.input}
        {...props}
      />
      {type === 'password' && (
        <button
          onClick={() => setShowPassword(!showPassword)}
          className={styles.passwordToggle}>
          {showPassword ? <EyeClosed /> : <Eye />}
        </button>
      )}
    </div>
  )
}
