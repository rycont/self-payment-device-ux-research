import {
  GoBack,
  Hexile,
  NumberPad,
  UnderlinedPageHeader,
  Vexile,
} from '@/component'
import { useState } from 'react'
import { PinDigit } from './style'

const PIN_DIGITS_LENGTH = 4

export const Pin: React.FC<{
  title: string
  onSubmit(pin: number): void
  onCancel(): void
}> = (props) => {
  const [digits, setDigits] = useState<number[]>([])

  const removeDigit = () => {
    setDigits((prevDigits) => prevDigits.slice(0, -1))
  }

  const addDigit = (digit: number) => {
    setDigits((prevDigits) => [...prevDigits, digit])
  }

  return (
    <Vexile x="center" filly y="center" gap={6}>
      <UnderlinedPageHeader>{props.title}</UnderlinedPageHeader>
      <Hexile gap={4}>
        {[...Array(PIN_DIGITS_LENGTH)].map((_, index) => (
          <PinDigit
            focused={digits.length === index}
            filled={digits[index] !== undefined}
          />
        ))}
      </Hexile>
      <NumberPad onInput={addDigit} removeDigit={removeDigit} />
      <GoBack />
    </Vexile>
  )
}
