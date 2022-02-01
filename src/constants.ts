export const API_URI = 'localhost/api/'
export const PUBSUB_URI = 'https://pubsub.rycont.ninja/sub/scanner'

export enum ROUTES {
  ROOT = '/',
  SCAN_PRODUCT = '/scan-product',
  TAG_QR = '/tag-QR',
  USER_RECOGNIZED = '/user-recognized',
  PAYMENT_SUCCEED = '/payment-succeed',
  PAYMENT_PIN_PROMPT = '/payment-pin-prompt',
  OPEN_FACE_SIGN = '/open-face-sign',
  SMS_VERIFICATION = '/sms-verification',
}

export const CONFIG = {
  USE_VIRTUAL_SCANNER: true,
}
