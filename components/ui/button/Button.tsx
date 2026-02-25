import { cn } from '@/utils'
import styles from './button.module.css'

export default function Button({
  text,
  onClick,
  size = 'base',
  variant = 'primary',
}: {
  text: string
  onClick: () => void
  size?: 'base' | 'full'
  variant?: 'primary' | 'secondary'
}) {
  return (
    <button
      className={cn(styles.button, styles[size], styles[variant])}
      onClick={onClick}>
      {text}
    </button>
  )
}

export function ButtonForm({
  text,
  size = 'base',
  isLoading,
  disabled = false,
}: {
  text: string
  size?: 'base' | 'full'
  isLoading?: boolean
  disabled?: boolean
}) {
  return (
    <button
      type='submit'
      className={cn(
        styles.button,
        styles[size],
        styles.primary,
        disabled && styles.disabled
      )}
      disabled={isLoading || disabled}>
      {text}
    </button>
  )
}
