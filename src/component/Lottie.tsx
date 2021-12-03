import { styled } from '#/stitches.config'
import lottie from 'lottie-web'
import { useEffect, useRef } from 'react'

export const Lottie: React.FC<{
  animate: any
  width?: number
  height?: number
  speed?: number
  loop?: boolean
  autoReverse?: boolean
  onFinish?: () => void
}> = (props) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const lottieController = lottie.loadAnimation({
      container: ref.current,
      animationData: props.animate,
      loop: props.loop,
    })
    if (props.speed) lottieController.setSpeed(props.speed)

    if (props.autoReverse) {
      const reverseCallback = () => {
        lottieController.setDirection(-1)
        lottieController.play()
        lottieController.removeEventListener('complete', reverseCallback)
        props.onFinish &&
          lottieController.addEventListener('complete', () => {
            props.onFinish!()
          })
      }
      lottieController.addEventListener('complete', reverseCallback)
    }
  }, [ref])
  return (
    <LottieWrapper
      css={{
        width: props.width && props.width + 'rem',
        height: props.height && props.height + 'rem',
      }}
      ref={ref}
    />
  )
}

const LottieWrapper = styled('div', {})
