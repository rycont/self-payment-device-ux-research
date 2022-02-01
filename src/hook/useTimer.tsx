import { styled } from '#/stitches.config'
import { Vexile, Description } from '@/component'
import { useEffect, useState } from 'react'

export const TimeLeftIndicator = styled('div', {
  height: '1rem',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  width: '100%',
  borderRadius: '1rem',
  overflow: 'hidden',
  '&:after': {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    content: '',
    display: 'block',
    height: '1rem',
    width: '0%',
    transition: '1s linear',
  },
})

export const useTimer = (time: number) => {
  const [lastTime, setLastTime] = useState(time)

  useEffect(() => {
    const decreaseInterval = setInterval(
      () => setLastTime((prev) => prev - 1),
      1000
    )

    return () => {
      clearInterval(decreaseInterval)
    }
  }, [])

  return {
    element: (
      <Vexile fillx x="center" gap={2}>
        <TimeLeftIndicator
          css={{
            '&:after': {
              width: (20 - lastTime) * 5 + '%',
            },
          }}
        />
        <Description>{lastTime}초</Description>
      </Vexile>
    ),
    lastTime,
  }
}
