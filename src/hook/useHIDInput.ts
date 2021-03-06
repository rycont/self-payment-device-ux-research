import { useCallback, useEffect, useState } from 'react'

export const useHIDInput = (props: { onData(data: string): void }) => {
  useEffect(() => {
    let text = ''

    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        props.onData(text)
        text = ''
      }

      if (isNaN(parseInt(e.key))) return

      text += e.key
    }

    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  }, [])
}
