import { useMemo } from "react"
import { Hexile, Vexile } from ".."
import { NumberButton, RemoveDigit } from "./style"

export const NumberPad: React.FC<{
    onInput(value: number): void
    removeDigit(): void
}> = props => {
    const numbers = useMemo(() => [...[...Array(10)].map((_, i) => i)].sort((a, b) => (Math.random() / Math.random()) - .5), [])
    const lines = useMemo(() => Math.ceil(numbers.length / 3), [numbers])
    return <Vexile x="center" relative>
        <RemoveDigit onClick={props.removeDigit}>←</RemoveDigit>
        {[...Array(lines)].map((_, i) => <Hexile key={`row${i}`}>
            {numbers.slice(i * 3, (i + 1) * 3).map((number, j) =>
                <NumberButton key={`key${number}`} onClick={() => props.onInput(number)}>
                    {number}
                </NumberButton>
            )}
        </Hexile>)}
    </Vexile>
}
