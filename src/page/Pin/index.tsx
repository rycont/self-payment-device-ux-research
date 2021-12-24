import { GoBack, Hexile, NumberPad, UnderlinedPageHeader, Vexile } from "@/component"
import { useState } from "react"
import { PinDigit } from "./style"

const PIN_DIGITS_LENGTH = 4

export const PinPage: React.FC = () => {
    const [digits, setDigits] = useState<number[]>([])

    const removeDigit = () => {
        setDigits(prevDigits => prevDigits.slice(0, -1))
    }

    const addDigit = (digit: number) => {
        setDigits(prevDigits => [
            ...prevDigits,
            digit
        ])
    }

    return <Vexile x="center" filly y="center" gap={6}>
        <UnderlinedPageHeader>결제 비밀번호 입력</UnderlinedPageHeader>
        <Hexile gap={4}>
            {[...Array(PIN_DIGITS_LENGTH)].map((_, index) =>
                <PinDigit focused={digits.length === index} filled={digits[index] !== undefined} />)}
        </Hexile>
        <NumberPad onInput={addDigit} removeDigit={removeDigit} />
        <GoBack />
    </Vexile>
}
