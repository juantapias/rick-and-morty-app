import React from 'react'

import styles from './fields.module.css'

export default function Fields({ children }: { children: React.ReactNode }) {
  return <div className={styles.fields}>{children}</div>
}

export function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor?: string
  children: React.ReactNode
}) {
  return (
    <label htmlFor={htmlFor} className={styles.fieldLabel}>
      {children}
    </label>
  )
}

export function FieldError({ children }: { children: React.ReactNode }) {
  return <p className='text-warning text-sm'>{children}</p>
}
