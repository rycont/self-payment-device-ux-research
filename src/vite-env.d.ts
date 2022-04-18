/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_FORCE_MOCK_SERVER: string
  readonly VITE_FACESIGN_URL: string
  readonly VITE_FACESIGN_KEY: string
  readonly VITE_VIRTUAL_SCANNER_SERVER: string
  readonly VITE_API_SERVER: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
