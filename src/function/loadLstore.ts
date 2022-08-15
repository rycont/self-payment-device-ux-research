import { LSTORE_KEYS, StoreType } from "@/constants"

export class LStroageNotFoundError extends Error {
    // constructor(message: string) {
    //     super(message)
    // }
}

const load = (key: keyof typeof LSTORE_KEYS) => {
    const loaded = localStorage.getItem(key)
    if (!loaded) return null

    const parsed = JSON.parse(loaded)
    if (!parsed) throw new LStroageNotFoundError()

    return parsed as StoreType[typeof key]
}

const save = (key: keyof typeof LSTORE_KEYS, value: StoreType[typeof key]) => {
    // const type = typeof value
    localStorage.setItem(key, JSON.stringify(value))
}

const clear = () => {
    localStorage.clear()
}

export const lstore = {
    load,
    save,
    clear
}
