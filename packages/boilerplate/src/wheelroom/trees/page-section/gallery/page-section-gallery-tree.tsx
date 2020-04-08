import React from 'react'
import { Box, Container } from '../../../elements/grid'
import { PageSectionProps } from '../../../../models/page-section/page-section'
import { getPageSectionInfo } from '../../../lib/get-page-section-info'
import { TopicProps } from '../../../../models/topic'
import { Image } from '../../../elements/image'
import { PageSectionGalleryTreeStyle } from './page-section-gallery-tree-style'

export const PageSectionGalleryTree = (props: {
  pageSection: PageSectionProps
  treeStyle: PageSectionGalleryTreeStyle
}) => {
  const pageSectionInfo = getPageSectionInfo(props.pageSection)
  if (!pageSectionInfo.hasTopic) {
    return null
  }
  const treeStyle = props.treeStyle || {}
  return (
    <Box is="div" ncss={treeStyle.wrapper}>
      <Container ncss={treeStyle.container}>
        {props.pageSection.topics
          .slice(0, 4)
          .map((topic: TopicProps, index: number) => (
            <Image
              treeStyle={treeStyle.image}
              key={index}
              media={topic?.media}
            />
          ))}
      </Container>
    </Box>
  )
}
