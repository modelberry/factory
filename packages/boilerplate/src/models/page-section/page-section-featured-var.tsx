/**
 * Component variation
 *
 * Component type: pageSection
 * Variation: Featured
 *
 */

import React from 'react'
import { PageSectionProps } from './page-section'
import { NotImplemented } from '../../wheelroom/lib/not-implemented'
import { getPageSectionInfo } from '../../wheelroom/lib/get-page-section-info'
import { pageSectionFeaturedTreeStyle } from '../../wheelroom/trees/page-section/featured/page-section-featured-tree-style'
import { PageSectionTopicTree } from '../../wheelroom/trees/page-section/topic/page-section-topic-tree'
import { addCssLabels } from '../../wheelroom/lib/add-css-labels'

export const PageSectionFeaturedVar = (props: PageSectionProps) => {
  const pageSectionInfo = getPageSectionInfo(props)
  addCssLabels('psFeatured', pageSectionFeaturedTreeStyle)

  if (pageSectionInfo.topicCount === 1) {
    return (
      <PageSectionTopicTree
        topicProps={{
          pageSectionActions: props.actions,
          fullTopicAsLink: true,
          pageSectionInfo,
          useHeadingElement: 'h3',
        }}
        containerStyle="maxWidth"
        pageSection={props}
        treeStyle={pageSectionFeaturedTreeStyle}
      />
    )
  }
  return <NotImplemented {...props} />
}
