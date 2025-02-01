import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'

import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      screens: {
        xs: '475px'
      },
      spacing: {
        16: '4.5rem',
        20: '5.5rem'
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite'
      },
      transitionDuration: {
        400: '400ms'
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            blockQuote: {
              borderColor: theme('colors.gray.50'),
              marginTop: '0.75rem',
              marginBottom: '0.75rem',
              fontWeight: theme('fontWeight.normal')
            },
            summary: {
              fontWeight: theme('fontWeight.bold'),
              color: theme('colors.gray.900')
            },
            p: {
              margin: 0,
              padding: 0,
              color: theme('colors.gray.900')
            },
            hr: {
              backgroundColor: theme('colors.gray.50'),
              borderColor: theme('colors.gray.50'),
              height: '0.25rem',
              marginTop: '0.5rem',
              marginBottom: '0.5rem'
            },
            'h1, h2, h3, h4': {
              color: theme('colors.gray.900')
            },
            'h5, h6': {
              color: theme('colors.gray.800')
            },
            'h1 a, h2 a, h3 a, h4 a, h5 a, h6 a': {
              textDecoration: 'none'
            },
            h1: {
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
              fontSize: theme('fontSize.3xl'),
              fontWeight: '900'
            },
            h2: {
              marginTop: '1rem',
              marginBottom: '0.25rem',
              fontSize: theme('fontSize.2xl'),
              fontWeight: theme('fontWeight.bold')
            },
            h3: {
              marginTop: '0.75rem',
              marginBotton: 0,
              fontSize: theme('fontSize.xl'),
              fontWeight: theme('fontWeight.semibold')
            },
            h4: {
              marginTop: '0.5rem',
              marginBottom: '0.25rem',
              fontSize: theme('fontSize.lg'),
              fontWeight: theme('fontWeight.medium')
            },
            li: {
              color: theme('colors.gray.900'),
              fontSize: '1rem',
              fontWeight: theme('fontWeight.medium'),
              padding: 0,
              margin: 0,
              lineHeight: 1.5
            },
            'ol, ul': {
              marginTop: '0.5rem'
            },
            'ul > * > ul': {
              marginTop: '0.25rem'
            },
            'ol > * > ol': {
              marginTop: '0.25rem'
            },
            ul: {
              listStyleType: 'none',
              padding: 0,
              margin: 0,
              color: theme('colors.gray.700')
            },
            'ul > li': {
              position: 'relative',
              paddingLeft: '1rem'
            },
            'ul > li::before': {
              content: '""',
              marginTop: '0.5rem',
              width: '0.50rem',
              height: '0.50rem',
              position: 'absolute',
              left: 0,
              borderRadius: '999px',
              backgroundColor: theme('colors.gray.300')
            },
            ol: {
              paddingTop: 0,
              paddingBottom: 0,
              margin: 0,
              fontSize: '0.75rem',
              fontWeight: 'normal',
              color: theme('colors.gray.700')
            },
            'ol > li': {
              margin: 0,
              padding: 0,
              position: 'relative'
            },
            'ol > li::marker': {
              paddingLeft: '0.5rem',
              color: theme('colors.gray.500')
            },
            a: {
              color: theme('colors.gray.900'),
              fontWeight: 'medium',
              textDecoration: 'underline',
              padding: 0,
              margin: 0
            },
            'li > a': {
              textDecoration: 'none'
            },
            'a code': {
              color: 'inherit',
              fontWeight: 'inherit'
            },
            'a strong': {
              color: 'inherit',
              fontWeight: 'inherit'
            },
            strong: {
              color: theme('colors.gray.900'),
              fontWeight: 'black'
            },
            kbd: {
              fontFamily: theme('fontFamily.mono').join(', '),
              backgroundColor: theme('colors.gray.50'),
              borderWidth: '1px',
              borderColor: theme('colors.gray.200'),
              padding: '0.125em 0.25em',
              color: theme('colors.gray.800'),
              fontWeight: theme('fontWeight.semibold'),
              fontSize: theme('fontSize.sm'),
              borderRadius: '0.75rem',
              margin: '0 1px',
              boxShadow: theme('boxShadow.lg'),
              paddingLeft: '0.50rem',
              paddingRight: '0.50rem'
            },
            pre: {
              fontFamily: theme('fontFamily.mono').join(', '),
              backgroundColor: "theme('colors.gray.50') !important",
              borderWidth: '1px',
              borderColor: theme('colors.gray.200'),
              borderRadius: theme('borderRadius.2xl'),
              paddingLeft: '1rem',
              paddingRight: '1rem',
              paddingTop: '.5rem',
              paddingBottom: '.5rem'
            },
            code: {
              color: theme('colors.gray.800')
            },
            'code *': {
              fontFamily: "theme('fontFamily.mono') !important"
            },
            img: {
              margin: '0'
            },
            'thead, tbody, tr, td': {
              borderColor: theme('colors.gray.200')
            }
          }
        },
        dark: {
          css: {
            blockQuote: {
              borderColor: theme('colors.gray.690')
            },
            summary: {
              fontWeight: theme('fontWeight.bold'),
              color: theme('colors.gray.50')
            },
            p: {
              color: theme('colors.gray.50')
            },
            hr: {
              backgroundColor: theme('colors.gray.690'),
              borderColor: theme('colors.gray.690')
            },
            'h1, h2, h3, h4': {
              color: theme('colors.gray.50')
            },
            'h5, h6': {
              color: theme('colors.gray.100')
            },
            'h2 small, h3 small, h4 small': {
              color: theme('colors.gray.200')
            },
            'ul > li': {
              color: theme('colors.gray.50')
            },
            'ul > li::before': {
              backgroundColor: theme('colors.gray.500')
            },
            'ol > li': {
              color: theme('colors.gray.50')
            },
            'ol > li::marker': {
              color: theme('colors.gray.500')
            },
            a: {
              color: theme('colors.gray.50')
            },
            strong: {
              color: theme('colors.gray.50')
            },
            kbd: {
              backgroundColor: theme('colors.gray.800'),
              borderColor: theme('colors.gray.690'),
              color: theme('colors.gray.100')
            },
            pre: {
              borderColor: theme('colors.gray.690'),
              backgroundColor: "theme('colors.gray.900') !important",
              color: theme('colors.gray.100')
            },
            code: {
              color: theme('colors.gray.100')
            },
            'thead, tbody, tr, td': {
              borderColor: theme('colors.gray.690')
            }
          }
        }
      })
    },
    fontFamily: {
      main: ['var(--font-main)', ...defaultTheme.fontFamily.sans],
      mono: ['var(--font-mono)', defaultTheme.fontFamily.mono]
    }
  },
  plugins: [require('@tailwindcss/typography')]
} as Config
