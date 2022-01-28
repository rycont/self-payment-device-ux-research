import { User } from '@/type/user'
import { createMockModel } from '..'

export const userMockModel = createMockModel<User>('user', [
  {
    id: 10101010100,
    studentId: 1,
    type: 0,
    username: 'rycont',
    name: '최재현',
    profileImage: 'https://github.com/rycont.png',
    hashedPin: btoa('1122'),
  },
])
