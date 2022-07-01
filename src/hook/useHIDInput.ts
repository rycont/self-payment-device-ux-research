import { CONFIG } from '@/constants'
import { subscribeTopic } from '@/function'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

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
    const sendData = (e: string) => {
      if (e === 'VERSION') {
        alert(import.meta.env.VITE_COMMIT_REF || 'unknown')
        return
      } else if (e === 'UPDATE') {
        window.location.reload()
        return
      } else if (e === 'THANKS') {
        toast.info(
          'Initialy made by Electrochemistry, Rycont, Cokia, Uglyonlytoday, dhalsdyd'
        )
        setTimeout(() => {
          toast.success('Special Thanks to')
          toast.success('🧑‍🎨Yeonplue')
          toast.success('🦐Coupy')
          toast.success('💱19기 이비즈니스과 오예빈 학생')
        }, 1000)

        setTimeout(() => {
          toast.info('디미페이가 엄랭보다 큰 업적이 되기를 바랍니다 By Rycont')
          toast.info('포스 드래그 막아줘 By Electrochemistry')
        }, 2000)
        return
      } else props.onData(e)
    }
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
        sendData(text)
        text = ''
      }

      if (!props.isNonNumericAllowed && isNaN(parseInt(e.key))) return
      if (e.key.length !== 1) return

      text += e.key
    }

    window.addEventListener('keydown', listener)

    window.input = (text: string) => sendData(text)

    return () => {
      window.removeEventListener('keydown', listener)
      pubsubUnsubscriber?.()
    }
  }, [])
}
