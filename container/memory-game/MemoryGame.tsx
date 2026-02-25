'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import Memory from '@/components/game/Memory'
import Button from '@/components/ui/button/Button'

import { useCharacters } from '@/hook/characters/useCharacters'

import { useAuthStore } from '@/store/auth.store'

import { GamePhase } from '@/types'

import styles from './memory.module.css'

import { LoaderCircle, TriangleAlert } from 'lucide-react'

export default function MemoryGame() {
  const { logout } = useAuthStore()

  const router = useRouter()

  const [phase, setPhase] = useState<GamePhase>('preview')
  const [gameId, setGameId] = useState<number>(0)

  const { data, isLoading, error, refetch } = useCharacters(1)

  const characters = data?.characters.results ?? []

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className={styles.memoryGame}>
      <div className={styles.memoryGameTitle}>
        <span>Juego de memoria</span>
      </div>

      <div className={styles.memoryGameContainer}>
        <div className={styles.memoryGameWrap}>
          {isLoading ? (
            <div className='flex flex-col items-center justify-center col-span-4'>
              <LoaderCircle
                className='animate-spin'
                size={52}
                color='#1A7A83'
              />
              <p className='text-base text-text'>Cargando personajes...</p>
            </div>
          ) : error ? (
            <div className='flex flex-col items-center justify-center col-span-4 gap-4'>
              <div className='flex flex-col items-center'>
                <TriangleAlert size={52} color='#FF4D4F' />
                <p className='text-base text-text'>Error al cargar</p>
              </div>

              <Button
                text='Reintentar'
                variant='secondary'
                onClick={() => refetch()}
              />
            </div>
          ) : (
            <Memory
              key={gameId}
              characters={characters}
              phase={phase}
              onFinish={() => setPhase('finished')}
            />
          )}
        </div>

        {!isLoading && (
          <div className='flex justify-center'>
            {!error && phase === 'preview' && (
              <Button
                text='Jugar'
                variant='secondary'
                onClick={() => {
                  setGameId(prev => prev + 1)
                  setPhase('playing')
                }}
              />
            )}

            {phase === 'finished' && (
              <div className='space-x-8'>
                <Button
                  text='Reiniciar'
                  variant='secondary'
                  onClick={() => {
                    setGameId(prev => prev + 1)
                    setPhase('preview')
                  }}
                />
                <Button
                  text='Volver al inicio'
                  variant='secondary'
                  onClick={handleLogout}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
