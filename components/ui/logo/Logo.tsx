import Image from 'next/image'

import { cn } from '@/utils'

import logo from '@/assets/images/logo.webp'

import styles from './logo.module.css'

export default function Logo({ size = 'base' }: { size?: 'base' | 'lg' }) {
  return (
    <figure className={cn(styles.logoWrap, size === 'lg' ? styles.lg : '')}>
      <Image
        fill
        src={logo.src}
        alt='Rick and Morty logo'
        className={styles.logo}
      />
    </figure>
  )
}
