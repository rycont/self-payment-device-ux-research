import { isDev } from './function'

export const API_URI = isDev
  ? 'http://localhost:4000/'
  : 'https://dimipay.up.railway.app/'
export const PUBSUB_URI = 'https://pubsub.rycont.ninja/sub/scanner'

export enum ROUTES {
  ROOT = '/',
  POS_AUTH = '/pos-auth',
  SCAN_PRODUCT = '/scan-product',
  SCAN_QR = '/scan-qr',
  USER_RECOGNIZED = '/user-recognized',
  REQUEST_PAYMENT = '/request-payment',
  PAYMENT_PIN_PROMPT = '/payment-pin-prompt',
  OPEN_FACE_SIGN = '/open-face-sign',
  SMS_VERIFICATION_REQUEST = '/sms-verification-request',
  SMS_VERIFICATION_PROMPT = '/sms-verification-prompt',
}

export const CONFIG = {
  USE_VIRTUAL_SCANNER: true,
}
