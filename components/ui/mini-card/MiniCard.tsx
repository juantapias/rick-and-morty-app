import Image from 'next/image'

import { Character } from '@/types'

import backgroundCardImg from '@/assets/images/backcard.webp'
import styles from './minicard.module.css'

export default function MiniCard({ character }: { character: Character }) {
  return (
    <div className={styles.miniCard}>
      <figure className={styles.miniCardThumbnail}>
        <Image
          src={character.image}
          alt={character.name}
          fill
          className={styles.minicardThumbnailImage}
        />
      </figure>
      <div>
        <h1 className={styles.miniCardTitle}>{character.name}</h1>
        <p className={styles.miniCardStatus}>
          {character.status} - {character.species}
        </p>
      </div>
    </div>
  )
}

export function MiniCardBack() {
  return (
    <div className={styles.miniCardBack}>
      <figure className={styles.miniCardBackThumbnail}>
        <Image
          src={backgroundCardImg.src}
          alt='backcard'
          fill
          className='max-w-full '
        />
      </figure>
    </div>
  )
}
