'use client'

import {
  useState,
  useRef,
  useMemo,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import MiniCard, { MiniCardBack } from '../ui/mini-card/MiniCard'

import { shuffleArray } from '@/utils'

import { Character, GamePhase } from '@/types'
import { PartyPopper } from 'lucide-react'

export default function Memory({
  characters,
  phase,
  pairs,
  setPairs,
  onFinish,
}: {
  characters: Character[]
  phase: GamePhase
  pairs: number
  setPairs: Dispatch<SetStateAction<number>>
  onFinish: () => void
}) {
  const [flipped, setFlipped] = useState<string[]>([])
  const [matched, setMatched] = useState<string[]>([])
  const [turns, setTurns] = useState<number>(0)
  const [isResolving, setIsResolving] = useState<boolean>(false)

  const containerRef = useRef<HTMLDivElement>(null)

  const isPlaying = phase === 'playing'

  const cards = useMemo(() => {
    const selected = characters.slice(0, pairs)

    if (phase === 'preview') {
      return selected.flatMap((char, index) => [
        {
          id: `${char.id}-a-${index}`,
          character: char,
        },
        {
          id: `${char.id}-b-${index}`,
          character: char,
        },
      ])
    }

    const duplicated = selected.flatMap((char, index) => [
      {
        id: `${char.id}-a-${index}`,
        character: char,
      },
      {
        id: `${char.id}-b-${index}`,
        character: char,
      },
    ])

    return shuffleArray(duplicated)
  }, [pairs, characters, phase])

  useGSAP(
    () => {
      if (!containerRef.current) return

      const elements = containerRef.current.children

      if (phase === 'playing') {
        const tl = gsap.timeline()

        tl.fromTo(
          elements,
          {
            rotation: () => gsap.utils.random(-20, 20),
            x: () => gsap.utils.random(-30, 30),
            y: () => gsap.utils.random(-30, 30),
            opacity: 0.6,
          },
          {
            rotation: 0,
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.04,
            ease: 'power3.inOut',
          }
        )
      }
    },
    { dependencies: [cards, phase] }
  )

  useEffect(() => {
    if (matched.length === pairs * 2) {
      onFinish()
    }
    //eslint-disable-next-line
  }, [matched])

  const handleDifficultyChange = (value: number) => {
    setPairs(value)
    setFlipped([])
    setMatched([])
    setTurns(0)
  }

  useGSAP(
    () => {
      if (!containerRef.current) return

      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power3.out',
        }
      )
    },
    { dependencies: [cards] }
  )

  const handleFlip = (cardId: string) => {
    if (!isPlaying) return
    if (isResolving) return

    if (flipped.length === 2) return
    if (flipped.includes(cardId)) return
    if (matched.includes(cardId)) return

    const newFlipped = [...flipped, cardId]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setTurns(prev => prev + 1)

      const [first, second] = newFlipped
      const firstCard = cards.find(c => c.id === first)
      const secondCard = cards.find(c => c.id === second)

      setTimeout(() => {
        if (firstCard?.character.id === secondCard?.character.id) {
          setMatched(prev => [...prev, first, second])
        }

        setFlipped([])
        setIsResolving(false)
      }, 800)
    }
  }

  return (
    <>
      <div className='flex w-full justify-between text-lg font-semibold'>
        <span>Turnos: {turns}</span>
        <div>
          <span>Dificultad: </span>
          <select
            value={pairs}
            onChange={e => handleDifficultyChange(Number(e.target.value))}
            disabled={phase === 'playing'}>
            <option value={8}>Facil</option>
            <option value={12}>Medio</option>
            <option value={16}>Dificil</option>
          </select>
        </div>
        <span>Aciertos: {matched.length / 2}</span>
      </div>

      <div ref={containerRef} className='grid grid-cols-4 gap-4'>
        {cards.filter(card => !matched.includes(card.id)).length > 0 ? (
          cards
            .filter(card => !matched.includes(card.id))
            .map(card => (
              <div
                key={card.id}
                onClick={() => handleFlip(card.id)}
                className='cursor-pointer'>
                {!isPlaying || flipped.includes(card.id) ? (
                  <MiniCard character={card.character} />
                ) : (
                  <MiniCardBack />
                )}
              </div>
            ))
        ) : (
          <div className='flex flex-col items-center justify-center col-span-4 gap-4'>
            <PartyPopper size={128} color='#1A7A83' />
            <div>
              <p className='text-lg text-text'>¡Felicidades, has ganado!</p>
              <p className='text-lg text-text'>
                Turnos: <strong>{turns}</strong>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
