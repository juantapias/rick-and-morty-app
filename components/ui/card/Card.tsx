import styles from './card.module.css'

export function Card({ children }: { children: React.ReactNode }) {
  return <div className={styles.card}>{children}</div>
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className={styles.cardHeader}>{children}</div>
}

export function CardBody({ children }: { children: React.ReactNode }) {
  return <div className={styles.cardBody}>{children}</div>
}
