/**
 * Component variation
 *
 * Component type: pageSection
 * Variation: Navigation
 *
 */

import React from 'react'
import { PageSectionProps } from './page-section'
import { NotImplemented } from '../../lib/not-implemented'
import { getPageSectionInfo } from '../../lib/get-page-section-info'
import { NavigationHeader } from '../navigation/navigation-header'
import { NavigationFooter } from '../navigation/navigation-footer'

export const PageSectionNavigationVar = (props: PageSectionProps) => {
  const info = getPageSectionInfo(props)
  if (info.hasNavigation && info.index === 0) {
    const segments = props.navigation.segments
    return (
      <NavigationHeader
        segments={segments}
        actions={props.actions}
        siteMetadata={props.siteMetadata}
        globals={props.globals}
      />
    )
  }

  if (info.hasNavigation && info.index === info.sectionCount - 1) {
    const segments = props.navigation.segments
    return (
      <NavigationFooter
        segments={segments}
        topics={props.topics}
        siteMetadata={props.siteMetadata}
        globals={props.globals}
      />
    )
  }

  /**
   * If you did not return a view above, Wheelroom will display this
   * notification
   */
  return <NotImplemented {...props} />
}
