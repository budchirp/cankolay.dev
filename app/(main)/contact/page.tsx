import type React from 'react'

import { MetadataManager } from '@/lib/metadata-manager'
import data from '@/data'
import Link from 'next/link'

import {
  Box,
  BoxContent,
  Column,
  Container,
  Grid,
  Row,
  Section,
  Center
} from '@trash-ui/components'

import type { Metadata } from 'next'

const Page: React.FC = (): React.ReactNode => (
  <Column>
    <Container>
      <Section title='Contact me'>
        <Grid>
          {(Object.keys(data.contact) as Array<keyof typeof data.contact>).map(
            (platform, index) => {
              const contact = data.contact[platform]

              return (
                <Box
                  key={index}
                  className='hover:bg-surface-secondary group transition-all duration-300'
                >
                  <BoxContent>
                    <Row>
                      <Center className='transition-all duration-300 size-10 aspect-square rounded-full bg-surface-primary-accent group-hover:bg-surface-secondary-accent border border-outline-accent group-hover:border-outline-accent-hover'>
                        {contact.icon}
                      </Center>

                      <Link
                        href={contact.link || '/contact'}
                        className='text-xl font-bold'
                        rel='noreferrer'
                        target='_blank'
                      >
                        {platform}
                      </Link>
                    </Row>
                  </BoxContent>
                </Box>
              )
            }
          )}
        </Grid>
      </Section>
    </Container>
  </Column>
)

export const metadata: Metadata = MetadataManager.generate(
  'Contact me',
  `${data.name}'s contact details`
)

export default Page
