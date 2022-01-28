import { MouseEvent } from 'react'
import { useRecoilState } from 'recoil'
import { modalContentAtom } from '@/coil'
import { ModalBackdrop, ModalWrapper } from './style'

export const ModalPlaceholder = () => {
  const [content, setContent] = useRecoilState(modalContentAtom)

  return content ? (
    <ModalBackdrop
      fillx
      filly
      x="center"
      y="center"
      onClick={() => {
        if (!content.dismissable) return
        setContent(null)
        content.onClose?.()
      }}
    >
      <ModalWrapper onClick={(e: MouseEvent) => e.stopPropagation()}>
        {content.content}
      </ModalWrapper>
    </ModalBackdrop>
  ) : (
    <>
      <></>
    </>
  )
}
