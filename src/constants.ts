export const API_URI = 'localhost/api/'
export const PUBSUB_URI = 'https://pubsub.rycont.ninja/sub/scanner'

export enum ROUTES {
  ROOT = '/',
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
