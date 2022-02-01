import { userMockModel } from '.'
import { createAPIConnector } from '..'

// function maskPhoneNumber(phone: string) .{
//   var pattern =
//   var result = ''
//   if (!phone) return result

//   if (pattern.test(phone)) {
//     result = sampleHpData[i].replace(pattern, '$1-$2**-*$3')
//   } else {
//     result = '***'
//   }
//   return result
// }

export const requestSmsVerification = createAPIConnector<
  {},
  {
    studentId: number
  },
  | {
      isValid: false
      message: string
    }
  | {
      isValid: true
      maskedPhoneNumber: string
      timeLimitSeconds: number
    }
>('auth/sms/create-otp', {
  method: 'POST',
  needAuth: true,
  mockHandler(_, req) {
    if (!req?.studentId)
      return {
        isValid: false,
        message: '학번이 올바르지 않아요',
      }

    const queriedUser = userMockModel.get(
      'studentId',
      'studentId'
    )({
      studentId: req.studentId,
    })

    if (queriedUser.phoneNumber)
      return {
        isValid: true,
        maskedPhoneNumber: '010-1234-5678'.replace(
          /^(\d{3})-?(\d{1,2})\d{2}-?\d(\d{3})$/,
          '$1-$2**-*$3'
        ),
        timeLimitSeconds: 20,
      }

    return {
      isValid: false,
      message:
        '디미페이에 전화번호가 등록되지 않았어요. 앱에서 전화번호를 등록하고 다시 시도해주세요.',
    }
  },
})
