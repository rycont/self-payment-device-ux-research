export const isDev = import.meta.env.VITE_FORCE_MOCK_SERVER === 'true'
export const useLocalServer = import.meta.env.VITE_USE_LOCAL_SERVER === 'true'

export const API_URI =
  isDev || useLocalServer
    ? 'https://dimipay-api-dev.rycont.ninja/'
    : 'https://dimipay-api.rycont.ninja/'

export const PUBSUB_URI = 'https://pubsub.rycont.ninja/sub/scanner'
export const FLUID_CONTAINER_ID = '7f47d256-ca8e-4313-941a-40955ecc6d81'
export const TOSS_ID = 'dimipay'

export enum ROUTES {
  ROOT = '/',
  POS_AUTH = '/pos-auth',
  SCAN_PRODUCT = '/scan-product',
  MANUAL_PAYMENT = '/manual-payment',
  SCAN_QR = '/scan-qr',
  USER_RECOGNIZED = '/user-recognized',
  REQUEST_PAYMENT = '/request-payment',
  PAYMENT_PIN_PROMPT = '/payment-pin-prompt',
  FACE_VERIFICATION = '/face-verification',
  SMS_VERIFICATION_SERIAL_INPUT = '/sms-verification-serial',
  SMS_VERIFICATION_PIN_INPUT = '/sms-verification-pin',
  SMS_VERIFICATION_PROMPT = '/sms-verification-prompt',
  CUSTOMER_VIEWER = '/customer-viewer',
}

export const CONFIG = {
  USE_VIRTUAL_SCANNER: false,
  INTERACTION_PERFORMANCE_MODE: 'full',
}

export const LSTORE_KEYS = {
  ACCESS_TOKEN: "ACCESS_TOKEN",
  REFRESH_TOKEN: "REFRESH_TOKEN"
}

export type StoreType = {
  ACCESS_TOKEN: string
  REFRESH_TOKEN: string
}
