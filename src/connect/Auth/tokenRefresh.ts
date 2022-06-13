import { createAPIConnector } from '../connector'

export const refresh = createAPIConnector<
  {},
  {},
  {
    refreshToken: string
    accessToken: string
  }
>('pos-login/refresh', {
  method: 'POST',
  mockHandler(urlParams?, reqBody?) {
    return {
      refreshToken: 'refreshToken',
      accessToken: 'accessToken',
    }
  },
  needAuth: false,
})
