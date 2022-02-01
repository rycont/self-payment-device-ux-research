import {
  GoBack,
  Hexile,
  NumberPad,
  UnderlinedPageHeader,
  Vexile,
} from '@/component'
import { useEffect, useState } from 'react'
import { Description } from '../atom'
import { PinDigit } from './style'

const PIN_DIGITS_LENGTH = 4

export const Pin: React.FC<{
  title?: string
  description?: string
  disableScramble?: boolean
  header?: JSX.Element
  onSubmit(pin: string): Promise<boolean | void>
}> = (props) => {
  const [digits, setDigits] = useState<number[]>([])

  const removeDigit = () => {
    setDigits((prevDigits) => prevDigits.slice(0, -1))
  }

  const addDigit = (digit: number) => {
    setDigits((prevDigits) => [...prevDigits, digit])
  }

  useEffect(() => {
    if (digits.length !== PIN_DIGITS_LENGTH) return
    props.onSubmit(digits.join('')).then((success) => {
      if (success === false) {
        setDigits([])
      }
    })
  }, [digits])

  return (
    <Vexile x="center" filly y="center" gap={12}>
      {props.title && (
        <Vexile x="center" gap={6}>
          <UnderlinedPageHeader>{props.title}</UnderlinedPageHeader>
          {props.description && <Description>{props.description}</Description>}
        </Vexile>
      )}
      {props.header}
      <Hexile gap={4}>
        {[...Array(PIN_DIGITS_LENGTH)].map((_, index) => (
          <PinDigit
            focused={digits.length === index}
            filled={digits[index] !== undefined}
          />
        ))}
      </Hexile>
      <NumberPad
        onInput={addDigit}
        removeDigit={removeDigit}
        disableScramble={props.disableScramble}
      />
      <GoBack />
    </Vexile>
  )
}
