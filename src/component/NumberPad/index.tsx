import { useMemo } from 'react'
import { Hexile, Vexile } from '..'
import { NumberButton, RemoveDigit } from './style'

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

export const NumberPad: React.FC<{
  onInput(value: number): void
  removeDigit(): void
  disableScramble?: boolean
}> = (props) => {
  const numbers = useMemo(
    () =>
      props.disableScramble
        ? NUMBERS
        : NUMBERS.sort((a, b) => Math.random() / Math.random() - 0.5),
    []
  )
  const lines = useMemo(() => Math.ceil(numbers.length / 3), [numbers])
  return (
    <Vexile x="center" relative>
      <RemoveDigit onClick={props.removeDigit}>←</RemoveDigit>
      {[...Array(lines)].map((_, i) => (
        <Hexile key={`row${i}`}>
          {numbers.slice(i * 3, (i + 1) * 3).map((number, j) => (
            <NumberButton
              key={`key${number}`}
              onClick={() => props.onInput(number)}
            >
              {number}
            </NumberButton>
          ))}
        </Hexile>
      ))}
    </Vexile>
  )
}
