export const isDev = (import.meta as (ImportMeta & {
    env: {
        DEV: boolean
    }
})).env.DEV
