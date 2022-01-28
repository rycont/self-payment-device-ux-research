import { MouseEvent, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalAppearanceAtom, modalContentAtom } from '@/coil'
import { ModalBackdrop, ModalWrapper } from './style'

export const ModalPlaceholder = () => {
  const [content, setContent] = useRecoilState(modalContentAtom)
  const [isClosing, setIsClosing] = useRecoilState(modalAppearanceAtom)

  useEffect(() => {
    if (isClosing) {
      content?.onClose?.()
      setTimeout(() => {
        setContent(null)
        setIsClosing(false)
      }, 800)
    }
  }, [isClosing])

  return content ? (
    <ModalBackdrop
      fillx
      filly
      x="center"
      y="center"
      onClick={() => {
        if (!content.dismissable) return
        setIsClosing(true)
      }}
      isClosing={isClosing}
    >
      <ModalWrapper
        onClick={(e: MouseEvent) => e.stopPropagation()}
        isClosing={isClosing}
      >
        {content.content}
      </ModalWrapper>
    </ModalBackdrop>
  ) : (
    <>
      <></>
    </>
  )
}
