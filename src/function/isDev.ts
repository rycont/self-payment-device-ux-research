console.log(import.meta)
export const isDev = import.meta.env.VITE_FORCE_MOCK_SERVER || import.meta.env.DEV
