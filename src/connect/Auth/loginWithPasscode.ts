import { createAPIConnector } from '../connector'

export const loginWithPasscode = createAPIConnector<
  {},
  {
    passcode: string
  },
  {
    accessToken: string
    refreshToken: string
    name: string
  }
>('pos-login', {
  method: 'POST',
  mockHandler: () => ({
    accessToken: 'asd',
    refreshToken: 'asdfjk',
    name: '파란색 아이패드',
  }),
  needAuth: false,
})
