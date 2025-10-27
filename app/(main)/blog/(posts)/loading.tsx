import type React from 'react'

import { Container, Box, Button, BoxContent, Column, Grid, Section, Divider } from '@trash-kit/ui'

const Loading: React.FC = (): React.ReactNode => (
  <Column padding='page'>
    <Container>
      <Section title='Posts'>
        <Grid>
          {[...Array(12)].map((_, index) => {
            return (
              <Box key={index}>
                <div className='bg-surface-secondary aspect-video w-full animate-pulse rounded-t-2xl' />

                <Divider />

                <BoxContent>
                  <div className='bg-surface-secondary h-3 w-1/4 animate-pulse rounded-sm' />

                  <div className='bg-surface-secondary h-3 w-1/2 animate-pulse rounded-sm' />

                  <div className='grid gap-2'>
                    <div className='bg-surface-secondary h-3 w-full animate-pulse rounded-sm' />
                    <div className='bg-surface-secondary h-3 w-full animate-pulse rounded-sm' />
                    <div className='bg-surface-secondary h-3 w-full animate-pulse rounded-sm' />
                  </div>
                </BoxContent>

                <Divider />

                <BoxContent>
                  <Button className='w-full' disabled color='surface'>
                    loading...
                  </Button>
                </BoxContent>
              </Box>
            )
          })}
        </Grid>
      </Section>
    </Container>
  </Column>
)

export default Loading
