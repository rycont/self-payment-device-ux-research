import { CONFIG, PUBSUB_URI } from '@/constants'
import { useEffect } from 'react'

const listenPubSub = async (onData: (data: string) => void) => {
  try {
    onData(await (await fetch(PUBSUB_URI)).text())
  } catch (e) {
  } finally {
    listenPubSub(onData)
  }
}

interface PubSubData {
  topic: string
  data: string
}

const isPubSubData = (data: any): data is PubSubData => {
  return (
    data &&
    'topic' in data &&
    typeof data.topic === 'string' &&
    'data' in data &&
    typeof data.data === 'string'
  )
}

export const useHIDInput = (props: {
  onData(data: string): void
  isNonNumericAllowed?: boolean
}) => {
  useEffect(() => {
    let text = ''

    if (CONFIG.USE_VIRTUAL_SCANNER) {
      listenPubSub((_data) => {
        const data = JSON.parse(_data)
        if (!isPubSubData(data)) throw new Error('Pub-Sub server malformed!')
        if (data.topic === 'scanner') {
          props.onData(data.data)
        }
      })
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
    return () => window.removeEventListener('keydown', listener)
  }, [])
}
