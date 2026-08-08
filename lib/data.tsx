import { SiTelegram } from 'react-icons/si'
import CONSTANTS from '@/lib/constants'
import { Mail } from 'lucide-react'

import { Column, Heading } from '@trash-kit/ui'

export default {
  seo: {
    description: 'Hello, World!',
    keywords: [
      'budchirp',
      'who is budchirp',
      'about budchirp',
      'budchirp projects',
      'contact budchirp',
      'can kolay',
      'who is can kolay',
      'about can kolay',
      'contact can kolay',
      'can kolay projects'
    ]
  },

  projectSources: ['budchirp', 'OxygeNvim'],

  projects: [
    {
      name: 'WakeUp',
      repo: 'budchirp/twodo'
    },
    {
      name: 'Trash Services',
      repo: 'budchirp/trash-web'
    },
    {
      name: 'Zep Language',
      repo: 'budchirp/zep-lang'
    },
    {
      name: 'OxygeNvim',
      repo: 'oxygenvim/oxygenvim'
    }
  ],

  about: (
    <Column className='gap-2'>
      <Column>
        <Heading className='wrap-break-word' size='h4'>
          Full-Stack & Android developer
        </Heading>
        <Heading className='wrap-break-word' size='h4'>
          Guitar player
        </Heading>
      </Column>

      <p className='text-content-tertiary'>
        Full-Stack and Android developer with over five years of experience, working across
        corporate and open-source projects. Focused on clean code and low-level programming, with an
        emphasis on compiler development. Guitar player with 1.5 years of experience.
      </p>
    </Column>
  ),

  contact: {
    Email: {
      link: `mailto:${CONSTANTS.EMAIL}`,
      icon: <Mail />
    },

    Telegram: {
      link: `https://t.me/${CONSTANTS.USERNAME}`,
      icon: <SiTelegram />
    }
  }
} as const
