import { CONFIG } from '@/constants'
import { subscribeTopic } from '@/function'
import { useEffect } from 'react'

declare global {
  interface Window {
    input(text: string): void
  }
}

export const useHIDInput = (props: {
  onData(data: string): void
  isNonNumericAllowed?: boolean
}) => {
  useEffect(() => {
    let text = ''
    let pubsubUnsubscriber: () => void

    if (CONFIG.USE_VIRTUAL_SCANNER) {
      pubsubUnsubscriber = subscribeTopic('scanner', props.onData)
    }

    const listener = (e: KeyboardEvent) => {
      if (e.key === 'p' && e.ctrlKey && e.altKey) {
        props.onData(prompt('입력할 데이터', '') || '')
      }

      if (e.key === 'Enter') {
        if (!text) return
        props.onData(text)
        text = ''
      }

      if (!props.isNonNumericAllowed && isNaN(parseInt(e.key))) return
      if (e.key.length !== 1) return

      text += e.key
    }

    window.addEventListener('keydown', listener)

    window.input = (text: string) => props.onData(text)

    return () => {
      window.removeEventListener('keydown', listener)
      pubsubUnsubscriber?.()
    }
  }, [])
}
