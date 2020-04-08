import React from 'react'
import { Box, Container } from '../../../elements/grid'
import { TopicProps } from '../../../../models/topic'
import { getPageSectionInfo } from '../../../lib/get-page-section-info'
import { PageSectionProps } from '../../../../models/page-section/page-section'
import { TopicTree } from '../../topic/topic-tree'
import { PageSectionImageTreeStyle } from './page-section-image-tree-style'

export const PageSectionImageTree = (props: {
  pageSection: PageSectionProps
  treeStyle: PageSectionImageTreeStyle
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
          .slice(0, 2)
          .map((topic: TopicProps, index: number) => (
            <TopicTree
              {...topic}
              key={index}
              pageSectionActions={props.pageSection.actions}
              pageSectionInfo={pageSectionInfo}
              useHeadingElement="h4"
              treeStyle={treeStyle.topic}
            />
          ))}
      </Container>
    </Box>
  )
}