import React, { Fragment } from 'react'
import { Box, Container } from '../../../core/elements/grid'
import { PageSectionProps } from '../page-section'
import { getPageSectionInfo } from '../../../lib/get-page-section-info'
import { TopicProps } from '../../topic'
import { Image } from '../../../core/elements/image'

export const GalleryDisplay = (props: { pageSection: PageSectionProps }) => {
  const pageSectionInfo = getPageSectionInfo(props.pageSection)
  if (!pageSectionInfo.hasTopic) {
    return null
  }
  return (
    <Fragment>
      <Box
        is="div"
        ncss={{
          label: 'Wrapper',
          bg: 'bg',
          py: [3, 6, 8],
        }}
      >
        <Container
          ncss={{
            flexDirection: ['column', 'row'],
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {props.pageSection.topics
            .slice(0, 4)
            .map((topic: TopicProps, index: number) => (
              <Image
                pictureNcss={{ w: [1, 1 / 2], p: 3 }}
                key={index}
                media={topic?.media}
              />
            ))}
        </Container>
      </Box>
    </Fragment>
  )
}
