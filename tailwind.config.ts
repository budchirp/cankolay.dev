import defaultTheme from 'tailwindcss/defaultTheme'

import type { Config } from 'tailwindcss'

export default {
  theme: {
    extend: {
      screens: {
        xs: '475px'
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite'
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            blockQuote: {
              borderColor: theme('colors.gray.400'),
              fontWeight: theme('fontWeight.normal'),
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
              paddingLeft: '1rem',
              borderLeftWidth: '0.375rem'
            },
            summary: {
              fontWeight: theme('fontWeight.bold'),
              color: theme('colors.gray.900')
            },
            p: {
              margin: '0.75rem 0',
              color: theme('colors.gray.900'),
              lineHeight: '1.625'
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
              marginTop: '2rem',
              marginBottom: '1rem',
              fontSize: theme('fontSize.3xl'),
              fontWeight: '900',
              lineHeight: '1.3'
            },
            h2: {
              marginTop: '1.75rem',
              marginBottom: '0.75rem',
              fontSize: theme('fontSize.2xl'),
              fontWeight: theme('fontWeight.bold'),
              lineHeight: '1.35'
            },
            h3: {
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
              fontSize: theme('fontSize.xl'),
              fontWeight: theme('fontWeight.semibold'),
              lineHeight: '1.4'
            },
            h4: {
              marginTop: '1.25rem',
              marginBottom: '0.5rem',
              fontSize: theme('fontSize.lg'),
              fontWeight: theme('fontWeight.medium'),
              lineHeight: '1.45'
            },
            li: {
              color: theme('colors.gray.900'),
              fontSize: '1rem',
              margin: '0.5rem 0',
              padding: 0,
              lineHeight: '1.750'
            },
            'ol, ul': {
              marginTop: '0.75rem',
              marginBottom: '0.75rem'
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
              paddingLeft: '1.25rem'
            },
            'ul > li::before': {
              content: '""',
              marginTop: '0.6875rem',
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
              borderRadius: theme('borderRadius.full'),
              margin: '0 1px',
              boxShadow: theme('boxShadow.lg'),
              paddingLeft: '0.50rem',
              paddingRight: '0.50rem'
            },
            pre: {
              borderRadius: theme('borderRadius.3xl'),
              backgroundColor: 'transparent',
              margin: 0,
              padding: 0
            },
            'pre > div > div > pre': {
              padding: '0.5rem 1rem '
            },
            code: {
              color: theme('colors.gray.800'),
              padding: 0,
              margin: 0
            },
            'code *': {
              fontFamily: "theme('fontFamily.mono') !important"
            },
            img: {
              objectFit: 'cover',
              margin: '0 auto',
              borderRadius: theme('borderRadius.2xl'),
            },
            'thead, tbody, tr, td, th': {
              borderColor: theme('colors.gray.200')
            },
            table: {
              width: '100%',
              borderCollapse: 'collapse'
            },
            th: {
              backgroundColor: theme('colors.gray.50'),
              fontWeight: theme('fontWeight.bold'),
              textAlign: 'left',
              padding: '0.75rem 1.5rem',
              color: theme('colors.gray.900')
            },
            td: {
              padding: '0.75rem',
              color: theme('colors.gray.900')
            },
            'tbody tr:nth-child(even)': {
              backgroundColor: theme('colors.gray.50')
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
            },
            th: {
              backgroundColor: theme('colors.gray.900'),
              color: theme('colors.gray.50')
            },
            td: {
              color: theme('colors.gray.50')
            },
            'tbody tr:nth-child(even)': {
              backgroundColor: theme('colors.gray.900')
            }
          }
        }
      })
    },
    fontFamily: {
      main: ['var(--font-main)', ...defaultTheme.fontFamily.sans],
      mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono]
    }
  },
  plugins: [require('@tailwindcss/typography')]
} as Config
