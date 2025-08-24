import type React from 'react'

import { Box, BoxContent, Column, Container, Grid, Section } from '@trash-ui/components'

const Loading: React.FC = (): React.ReactNode => (
  <Column>
    <Container>
      <Section title='Projects' />

      <Grid>
        {[...Array(24)].map((_, index) => {
          return (
            <Box key={index}>
              <BoxContent>
                <div className='bg-surface-secondary h-3 w-8/12 animate-pulse rounded-sm' />
                <div className='bg-surface-secondary h-2 w-full animate-pulse rounded-sm' />

                <div className='bg-surface-secondary h-3 w-3/12 animate-pulse rounded-sm' />
              </BoxContent>
            </Box>
          )
        })}
      </Grid>
    </Container>
  </Column>
)

export default Loading
