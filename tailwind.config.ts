import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'

import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        xs: '475px'
      },
      spacing: {
        16: '4.5rem',
        20: '5.5rem'
      },
      colors: {
        gray: {
          ...colors.gray,
          900: '#0b0a0e',
          800: '#100f15',
          700: '#121118',
          690: '#1a1b1e'
        },
        accent: colors.rose
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
              fontWeight: 'normal'
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
              color: theme('colors.gray.900'),
              letterSpacing: '-0.025em'
            },
            h1: {
              marginTop: '0.75rem',
              marginBottom: '0.25rem',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            },
            h2: {
              marginTop: '0.5rem',
              marginBottom: '0.25rem',
              fontSize: '1.25rem',
              fontWeight: 'bold'
            },
            h3: {
              marginTop: 'duration-400`0.25rem',
              marginBotton: '0.25rem',
              fontSize: '1.125rem',
              fontWeight: 'semibold'
            },
            h4: {
              marginTop: '0.25rem',
              marginBottom: '0.25rem',
              fontSize: '1rem',
              fontWeight: 'medium'
            },
            'h2 small, h3 small, h4 small': {
              fontFamily: theme('fontFamily.mono').join(', '),
              color: theme('colors.gray.800'),
              fontWeight: 500
            },
            'h2 code, h3 code': {
              font: 'inherit'
            },
            li: {
              color: theme('colors.gray.900'),
              fontSize: '1rem',
              fontWeight: 'medium',
              padding: 0,
              margin: 0,
              lineHeight: 1.5
            },
            ul: {
              listStyleType: 'none',
              paddingLeft: '0.5rem',
              padding: 0,
              margin: 0
            },
            'ul > li': {
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              paddingLeft: '1.25rem'
            },
            'ul > li::before': {
              content: '""',
              width: '0.50rem',
              height: '0.50rem',
              position: 'absolute',
              left: 0,
              borderRadius: '999px',
              backgroundColor: theme('colors.gray.200')
            },
            ol: {
              fontSize: '0.75rem',
              fontWeight: 'normal',
              color: theme('colors.gray.700')
            },
            'ol > li > ol': {
              margin: '0',
              padding: '0'
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
              backgroundColor: theme('colors.gray.50'),
              borderWidth: '1px',
              borderColor: theme('colors.gray.200'),
              padding: '0.125em 0.25em',
              color: theme('colors.gray.800'),
              fontWeight: 'semibold',
              fontSize: '0.875rem',
              fontVariantLigatures: 'none',
              borderRadius: '0.75rem',
              margin: '0 1px',
              paddingLeft: '0.50rem',
              paddingRight: '0.50rem'
            },
            code: {
              borderWidth: '1px',
              borderColor: theme('colors.gray.200'),
              color: theme('colors.gray.800'),
              backgroundColor: theme('colors.gray.50'),
              borderRadius: '0.75rem',
              paddingLeft: '0.50rem',
              paddingRight: '0.50rem'
            }
          }
        },
        dark: {
          css: {
            blockQuote: {
              borderColor: theme('colors.gray.690')
            },
            p: {
              color: theme('colors.gray.50')
            },
            hr: {
              backgroundColor: theme('colors.gray.690'),
              borderColor: theme('colors.gray.690')
            },
            h1: {
              color: theme('colors.gray.50')
            },
            h2: {
              color: theme('colors.gray.100')
            },
            h3: {
              color: theme('colors.gray.100')
            },
            h4: {
              color: theme('colors.gray.100')
            },
            'h1, h2, h3, h4': {
              color: theme('colors.gray.50')
            },
            'h2 small, h3 small, h4 small': {
              color: theme('colors.gray.100')
            },
            'ul > li': {
              color: theme('colors.gray.50')
            },
            'ul > li::before': {
              backgroundColor: theme('colors.gray.500')
            },
            ol: {
              color: theme('colors.gray.100')
            },
            'ol > li': {
              color: theme('colors.gray.50')
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
            code: {
              borderColor: theme('colors.gray.690'),
              color: theme('colors.gray.50'),
              backgroundColor: theme('colors.gray.100')
            }
          }
        }
      })
    },
    fontFamily: {
      main: ['var(--font-main)', ...defaultTheme.fontFamily.sans],
      mono: defaultTheme.fontFamily.mono
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar')({
      nocompatible: true
    })
  ]
} as Config
