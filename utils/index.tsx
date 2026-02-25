import { classValue } from '@/types/class'

export function cn(...classes: classValue[]): string {
  return classes.filter(Boolean).join(' ')
}

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1)
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }

  return newArray
}
