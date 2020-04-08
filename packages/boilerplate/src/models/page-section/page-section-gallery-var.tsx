/**
 * Component variation
 *
 * Component type: pageSection
 * Variation: Gallery
 *
 */

import React from 'react'
import { PageSectionProps } from './page-section'
import { NotImplemented } from '../../wheelroom/lib/not-implemented'
import { getPageSectionInfo } from '../../wheelroom/lib/get-page-section-info'
import { PageSectionGalleryTree } from '../../wheelroom/trees/page-section/gallery/page-section-gallery-tree'
import { pageSectionGalleryTreeStyle } from '../../wheelroom/trees/page-section/gallery/page-section-gallery-tree-style'
import { addCssLabels } from '../../wheelroom/lib/add-css-labels'

export const PageSectionGalleryVar = (props: PageSectionProps) => {
  const pageSectionInfo = getPageSectionInfo(props)
  if (pageSectionInfo.hasTopic) {
    return (
      <PageSectionGalleryTree
        pageSection={props}
        treeStyle={addCssLabels('psGallery', pageSectionGalleryTreeStyle)}
      />
    )
  }
  return <NotImplemented {...props} />
}
