/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_FORCE_MOCK_SERVER: string
  readonly VITE_USE_LOCAL_SERVER: string
  readonly VITE_COMMIT_REF: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
