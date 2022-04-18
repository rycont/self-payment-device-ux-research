import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { currentUserAtom } from '@/coil'
import { GoBack, Hexile, RegularImportant, Vexile } from '@/component'
import { CameraArea } from './style'
import { getUserFromSUID } from '@/connect'
import { ROUTES } from '@/constants'
import { UserWithApprovalToken } from '@/type'
import { toast } from 'react-toastify'

interface FaceSignUser {
  name: string
  similarity: number
  customKey: string
}

interface FaceSignResponse {
  eventCode: string
  similarUsers?: {
    users: FaceSignUser[]
  }
  success?: FaceSignUser
  type: 'SIMILAR_USERS'
}

const facesignValidator = async (
  cam: MediaStream,
  callback: (
    args:
      | {
          matched: false
          similarUserSuids?: string[]
        }
      | {
          matched: true
          user: UserWithApprovalToken
        }
  ) => void
) => {
  let captured = new ImageCapture(cam.getVideoTracks()[0])

  const frame = await captured.takePhoto()
  const form = new FormData()

  form.append('image', frame)

  const res: FaceSignResponse = await (
    await fetch(import.meta.env.VITE_FACESIGN_URL, {
      body: form,
      headers: new Headers({
        'X-NCP-APIGW-API-KEY': import.meta.env.VITE_FACESIGN_KEY,
      }),
      method: 'POST',
    })
  ).json()

  const loadedUsers = [...(res.similarUsers?.users || []), res.success].filter(
    (e) => e && e.similarity > 0.5
  ) as FaceSignUser[]

  const correctlyMatched = loadedUsers.find((e) => e.similarity > 0.7)

  if (correctlyMatched) {
    const suid = correctlyMatched.customKey.split('@')[0]
    const matchedUser = await getUserFromSUID.request({ suid })
    if (!matchedUser) throw new Error('사용자 정보를 가져오지 못했어요')

    return callback({
      matched: true,
      user: matchedUser,
    })
  }

  const similarUsers = loadedUsers?.filter((e) => e.similarity > 0.4)

  if (similarUsers?.length)
    return callback({
      matched: false,
      similarUserSuids: similarUsers.map((e) => e.customKey.split('@')[0]),
    })

  return callback({
    matched: false,
  })
}

export const OpenFaceSign = () => {
  const setUser = useRecoilState(currentUserAtom)[1]
  const goto = useNavigate()
  const cameraRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    ;(async () => {
      const video = cameraRef.current
      if (!video) return
      const cam = await navigator.mediaDevices.getUserMedia({
        video: true,
      })
      video.srcObject = cam
      video.addEventListener('loadedmetadata', (e) => {
        video.play()
      })
      const faceAction = async (
        result: Parameters<Parameters<typeof facesignValidator>['1']>['0']
      ) => {
        console.log(result)
        if (result.matched) {
          video.pause()
          setUser(result.user)
          return goto(ROUTES.USER_RECOGNIZED)
        }

        if (result.similarUserSuids) return toast.info('유사 얼굴 판별됨')
        toast.info('일치하는 얼굴을 찾을 수 없어요..')

        await facesignValidator(cam, faceAction)
      }

      console.log('했냐고?!')
      facesignValidator(cam, faceAction)
    })()
  }, [cameraRef])

  return (
    <Vexile fillx filly x="center" y="center">
      <CameraArea ref={cameraRef} />
      <Hexile x="space" padding={8} y="center" fillx>
        <GoBack />
        <RegularImportant>정면을 바라봐주세요</RegularImportant>
      </Hexile>
    </Vexile>
  )
}
