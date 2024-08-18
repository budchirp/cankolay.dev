import { cn } from '@/lib/cn'
import { Transition } from '@headlessui/react'
import type React from 'react'

export type BackdropProps = {
  show: boolean
  onChange?: () => void
}

export const Backdrop: React.FC<BackdropProps> = ({
  show,
  onChange
}: BackdropProps): React.ReactNode => {
  return (
    <Transition
      show={show}
      as='div'
      onClick={onChange}
      className={cn(
        'transition-all bg-primary !bg-opacity-25 !backdrop-blur-sm h-screen_ fixed inset-0 z-[75] mt-16 w-screen',
        'data-[closed]:!backdrop-blur-none data-[closed]:!bg-opacity-0',
        'data-[enter]:ease-out data-[enter]:duration-400',
        'data-[leave]:ease-in data-[leave]:duration-200'
      )}
    />
  )
}
