import { CONFIG } from '@/constants'
import { subscribeTopic } from '@/function'
import { useEffect } from 'react'

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
        props.onData(text)
        text = ''
      }

      if (props.isNonNumericAllowed || isNaN(parseInt(e.key))) return

      text += e.key
    }

    window.addEventListener('keydown', listener)
    return () => {
      window.removeEventListener('keydown', listener)
      pubsubUnsubscriber()
    }
  }, [])
}
