import { Database, Globe, Layers, Mail, Smartphone, Terminal } from 'lucide-react'
import { SiTelegram } from 'react-icons/si'
import CONSTANTS from '@/lib/constants'

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

  projects: [
    {
      name: 'TwoDo',
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

  servicesDescription:
    'Need help with a project, server setup, or a full app build? Here is what I can build, fix, or optimize for you:',

  services: [
    {
      title: 'Linux Support',
      description:
        'Server setup, shell scripting, performance tuning, and troubleshooting Linux systems to keep everything running reliably.',
      icon: <Terminal />
    },
    {
      title: 'Android App Dev & Design',
      description:
        'Native Android development in Kotlin and Java, covering both core application logic and clean mobile UI design.',
      icon: <Smartphone />
    },
    {
      title: 'Web Dev & Design',
      description:
        'Responsive frontend development using React, Next.js, and TypeScript, built to be clean, fast, and accessible.',
      icon: <Globe />
    },
    {
      title: 'Backend Development',
      description:
        'Designing REST and GraphQL APIs, database management, and server-side code built for reliability and performance.',
      icon: <Database />
    },
    {
      title: 'Full Stack Dev',
      description:
        'Building complete applications from database models and backend services to the user interface on the frontend.',
      icon: <Layers />
    }
  ],

  about: (
    <Column className='gap-2'>
      <Heading className='wrap-break-word' size='h4'>
        Full-Stack & Android Developer
      </Heading>

      <p className='text-content-secondary leading-relaxed'>
        Developer with over five years of experience building web, mobile, and backend applications.
        I handle everything from low-level systems and backend APIs to polished mobile interfaces,
        focused on clear code that works well and is easy to maintain.
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
