import type React from 'react'

import { bundledLanguages, createHighlighter } from 'shiki/bundle/full'
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight
} from '@shikijs/transformers'

import githubDarkDefault from '@shikijs/themes/github-dark-default'
import githubLightDefault from '@shikijs/themes/github-light-default'

import { CopyButton } from '@/components/markdown/code/copy-button'

import { Box, BoxContent, Divider, Row, Text } from '@trash-kit/ui'

const shiki = await createHighlighter({
  themes: [githubDarkDefault, githubLightDefault],
  langs: Object.keys(bundledLanguages)
})

type MarkdownCodeProps = {
  children: React.ReactNode
  className: string
}

export const MarkdownCode: React.FC<MarkdownCodeProps> = async ({
  children,
  className
}: MarkdownCodeProps) => {
  const match = /language-(\w+)/.exec(className || '')
  if (match) {
    const lang = match[1]
    const code = String(children).replace(/\n$/, '')
    const html = shiki.codeToHtml(code, {
      lang: !Object.keys(bundledLanguages).includes(lang) ? 'plaintext' : lang,
      themes: {
        light: 'github-light-default',
        dark: 'github-dark-default'
      },
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        transformerNotationFocus(),
        transformerNotationErrorLevel()
      ]
    })

    return (
      <Box className='group relative'>
        <div className='absolute top-0 right-0 p-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300'>
          <CopyButton content={code} />
        </div>

        <BoxContent className='py-1 px-3'>
          <Text className='font-medium text-primary'>{lang}</Text>
        </BoxContent>

        <Divider />

        <BoxContent className='p-0.5'>
          <div
            dangerouslySetInnerHTML={{
              __html: html
            }}
          />
        </BoxContent>
      </Box>
    )
  }

  return <code>{children}</code>
}
