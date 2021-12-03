/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_FORCE_MOCK_SERVER: boolean
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
