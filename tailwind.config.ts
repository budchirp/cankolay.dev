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
            },
            'h5, h6': {
              color: theme('colors.gray.800'),
            },
            h1: {
              marginTop: '1.25rem',
              marginBottom: '0.5rem',
              fontSize: '1.5rem',
              fontWeight: '900'
            },
            h2: {
              marginTop: '1rem',
              marginBottom: '0.25rem',
              fontSize: '1.25rem',
              fontWeight: 'bold'
            },
            h3: {
              marginTop: '0.75rem',
              marginBotton: 0,
              fontSize: '1rem',
              fontWeight: 'semibold'
            },
            h4: {
              marginTop: '0.25rem',
              marginBottom: '0.25rem',
              fontSize: '1rem',
              fontWeight: 'medium'
            },
            li: {
              color: theme('colors.gray.900'),
              fontSize: '1rem',
              fontWeight: 'medium',
              padding: 0,
              margin: 0,
              lineHeight: 1.5
            },
            "ol, ul": {
              marginTop: "0.5rem"
            },
            "ul > * > ul": {
              marginTop: "0.25rem"
            },
            "ol > * > ol": {
              marginTop: "0.25rem"
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
              marginTop: "0.5rem",
              width: '0.50rem',
              height: '0.50rem',
              position: 'absolute',
              left: 0,
              borderRadius: '999px',
              backgroundColor: theme('colors.gray.200')
            },
            ol: {
              paddingTop: 0,
              paddingBottom: 0,
              margin: 0,
              fontSize: '0.75rem',
              fontWeight: 'normal',
              color: theme('colors.gray.700')
            },
            "ol > li": {
              margin: 0,
              padding: 0,
              position: 'relative',
            },
            "ol > li::marker": {
              paddingLeft: "0.5rem",
              color: theme('colors.gray.200')
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
            pre: {
              fontFamily: theme('fontFamily.mono').join(', '),
              borderRadius: theme('borderRadius.2xl'),
              width: '100%',
              background: 'transparent !important',
              padding: '0 !important'
            },
            kbd: {
              fontFamily: theme('fontFamily.mono').join(', '),
              backgroundColor: theme('colors.gray.50'),
              borderWidth: '1px',
              borderColor: theme('colors.gray.200'),
              padding: '0.125em 0.25em',
              color: theme('colors.gray.800'),
              fontWeight: 'semibold',
              fontSize: '0.875rem',
              borderRadius: '0.75rem',
              margin: '0 1px',
              paddingLeft: '0.50rem',
              paddingRight: '0.50rem'
            },
            code: {
              fontFamily: theme('fontFamily.mono').join(', '),
              borderWidth: '1px',
              borderColor: theme('colors.gray.200'),
              color: theme('colors.gray.800'),
              backgroundColor: theme('colors.gray.50'),
              borderRadius: '0.75rem',
              paddingLeft: '0.50rem',
              paddingRight: '0.50rem',
              paddingTop: '0.25rem',
              paddingBottom: '0.25rem'
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
            'h1, h2, h3, h4': {
              color: theme('colors.gray.50')
            },
            'h5, h6': {
              color: theme('colors.gray.100'),
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
            "ol > li::marker": {
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
            code: {
              borderColor: theme('colors.gray.690'),
              color: theme('colors.gray.50'),
              backgroundColor: theme('colors.gray.900')
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
