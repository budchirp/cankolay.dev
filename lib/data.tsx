import {
  SiTypescript,
  SiPython,
  SiJavascript,
  SiLua,
  SiNeovim,
  SiTailwindcss,
  SiGnubash,
  SiNestjs,
  SiC,
  SiKotlin,
  SiExpress,
  SiCplusplus,
  SiJetpackcompose,
  SiSqlite,
  SiPostgresql,
  SiJetbrains,
  SiTelegram,
  SiMaterialdesign,
  SiNextdotjs,
  SiRust,
  SiSpringboot
} from 'react-icons/si'
import { FaCss3, FaGit, FaJava, FaLinux, FaReact } from 'react-icons/fa'
import { FunctionSquare, Mail, Syringe } from 'lucide-react'

import CONSTANTS from '@/lib/constants'

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

  projectSources: ['budchirp', 'oxygenvim'],

  about: (
    <>
      <p>Full-Stack developer</p>
      <p>Guitar player</p>
    </>
  ),

  technologies: {
    Languages: [
      {
        name: 'Kotlin',
        icon: <SiKotlin />
      },
      {
        name: 'Java',
        icon: <FaJava />
      },
      {
        name: 'Rust',
        icon: <SiRust />
      },
      {
        name: 'C',
        icon: <SiC />
      },
      {
        name: 'C++',
        icon: <SiCplusplus />
      },
      {
        name: 'Javascript',
        icon: <SiJavascript />
      },
      {
        name: 'Typescript',
        icon: <SiTypescript />
      },
      {
        name: 'Lua',
        icon: <SiLua />
      },
      {
        name: 'Python',
        icon: <SiPython />
      },
      {
        name: 'Bash',
        icon: <SiGnubash />
      }
    ],

    Tools: [
      {
        name: 'Linux',
        icon: <FaLinux />
      },
      {
        name: 'Git',
        icon: <FaGit />
      },
      {
        name: 'Neovim',
        icon: <SiNeovim />
      },
      {
        name: 'Jetbrains IDEs',
        icon: <SiJetbrains />
      }
    ],

    Database: [
      {
        name: 'SQLite',
        icon: <SiSqlite />
      },
      {
        name: 'Postgresql',
        icon: <SiPostgresql />
      }
    ]
  },

  stacks: {
    Frontend: [
      {
        name: 'React',
        icon: <FaReact />
      },
      {
        name: 'CSS',
        icon: <FaCss3 />
      },
      {
        name: 'TailwindCSS',
        icon: <SiTailwindcss />
      }
    ],

    Backend: [
      {
        name: 'Express.js',
        icon: <SiExpress />
      },
      {
        name: 'NestJS',
        icon: <SiNestjs />
      },
      {
        name: 'Spring Boot',
        icon: <SiSpringboot />
      }
    ],

    'Full Stack': [
      {
        name: 'Next.js',
        icon: <SiNextdotjs />
      }
    ],

    'Mobile / Android': [
      {
        name: 'Jetpack Compose',
        icon: <SiJetpackcompose />
      },
      {
        name: 'Material 3',
        icon: <SiMaterialdesign />
      },
      {
        name: 'Hilt',
        icon: <Syringe />
      },
      {
        name: 'Clean Architecture',
        icon: <FunctionSquare />
      }
    ],

    'Cross-Platform': [
      {
        name: 'Compose Multiplatform',
        icon: <SiJetpackcompose />
      }
    ]
  },

  journey: {
    2025: ['Started creating my own language called Graphite'],
    2024: ['Started learning Rust and C++'],
    2023: ['Started learning C, Java and Kotlin'],
    2022: ['Learned Typescript', 'Learned basic React', 'Learned TailwindCSS', 'Learned Lua'],
    2021: ['Learned Javascript', 'Learned PHP', 'Learned Python'],
    2020: ['Learned HTML, CSS']
  },

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
