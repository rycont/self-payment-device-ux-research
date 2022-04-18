import { isDev, useLocalServer } from './function'

export const API_URI =
  isDev || useLocalServer
    ? 'http://localhost:4000/'
    : import.meta.env.VITE_API_SERVER
export const PUBSUB_URI = import.meta.env.VITE_VIRTUAL_SCANNER_SERVER

export enum ROUTES {
  ROOT = '/',
  POS_AUTH = '/pos-auth',
  SCAN_PRODUCT = '/scan-product',
  SCAN_QR = '/scan-qr',
  USER_RECOGNIZED = '/user-recognized',
  REQUEST_PAYMENT = '/request-payment',
  PAYMENT_PIN_PROMPT = '/payment-pin-prompt',
  FACE_VERIFICATION = '/face-verification',
  SMS_VERIFICATION_SERIAL_INPUT = '/sms-verification-serial',
  SMS_VERIFICATION_PIN_INPUT = '/sms-verification-pin',
  SMS_VERIFICATION_PROMPT = '/sms-verification-prompt',
}

export const CONFIG = {
  USE_VIRTUAL_SCANNER: false,
}
