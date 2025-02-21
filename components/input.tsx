'use client'

import type React from 'react'
import { useEffect, useRef, type ComponentProps } from 'react'

import { cn } from '@/lib/cn'

export type InputProps = {
  icon: React.ReactNode
  label?: React.ReactNode
  textarea?: boolean
} & ComponentProps<'input'>

export const Input: React.FC<InputProps> = ({
  className,
  label,
  id,
  value,
  icon,
  textarea,
  onKeyDown,
  ...props
}: InputProps): React.ReactNode => {
  const Component: 'input' = textarea ? 'textarea' : ('input' as any)

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const handleKeyDown = (event: any) => {
    if (textarea) {
      if (event.key === 'Enter') {
        if (event.shiftKey) {
          event.preventDefault()

          const textarea = textareaRef.current
          if (!textarea) return

          const start = textarea.selectionStart
          const end = textarea.selectionEnd
          const currentValue = textarea.value
          const newValue = `${currentValue.substring(0, start)}\n${currentValue.substring(end)}`
          textarea.value = newValue
          textarea.selectionStart = textarea.selectionEnd = start + 1

          setTimeout(() => {
            textarea.scrollTop = textarea.scrollHeight
          }, 0)
        } else {
          event.preventDefault()

          const form = (event.target as any).form as HTMLFormElement
          if (form) {
            form.requestSubmit()
          }
        }
      }
    }

    if (onKeyDown) {
      onKeyDown(event)
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '2.5rem'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [textarea, value])

  return (
    <div className='flex h-min w-full flex-col justify-center gap-1'>
      <label htmlFor={id}>{label}</label>

      <div className='relative flex min-h-10 max-h-48 w-full items-center rounded-3xl'>
        <div className='absolute inset-y-0 left-0 flex h-10 w-10 items-center justify-center bg-transparent pl-2 text-3xl'>
          {icon}
        </div>

        <Component
          {...props}
          id={id}
          value={value}
          ref={textarea && (textareaRef as any)}
          onKeyDown={handleKeyDown}
          className={cn(
            'bg-background-primary min-h-10 max-h-48 text-text-primary placeholder-text-tertiary border-border focus:border-border-hover hover:border-border-hover flex h-10 w-full items-center rounded-3xl border py-2 pl-11 pr-4 transition duration-300 resize-none overflow-auto',
            className
          )}
        />
      </div>
    </div>
  )
}
Input.displayName = 'Input'
