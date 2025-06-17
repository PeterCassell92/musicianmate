import { createContext, useContext } from 'react'
import AudioQueueContextType from 'types/audioQueueContext'

// Default value: null, meaning "not initialized yet"
export const AudioQueueContext = createContext<AudioQueueContextType | null>(null)

// Optional: a custom hook so you don’t have to null-check everywhere
export function useAudioQueue(): AudioQueueContextType {
  const context = useContext(AudioQueueContext)
  if (!context) {
    throw new Error('useAudioQueue must be used within AudioQueueContext.Provider')
  }
  return context
}