/**
 * Component variation
 *
 * Component type: blogSection
 * Variation: List
 *
 */

import React from 'react'
import { BlogProps } from '../blog/model-types'
import { deepMerge } from '../../lib/deep-merge'
import { getWheel, getSectionStyle } from '../../../themes/themes'
import { ScrollSpy } from '../../lib/scroll-spy'
import { ThemeId } from '../../../admin-resources/theme-info'
import { Wheel } from '../../types/wheel'
import { List } from './list/list'
import { BlogSectionProps } from './model-types'

export const BlogSectionListVar = (props: BlogSectionProps) => {
  const wheel: Wheel = getWheel(props.activeThemeId as ThemeId)
  wheel.style = deepMerge([getSectionStyle('blogSection').list])

  if (!props.allBlog) {
    return null
  }
  const blogPosts: BlogProps[] = props.allBlog.edges.map(
    (edges: any) => edges.node
  )
  return (
    <ScrollSpy
      eventId={props.eventId}
      siteEmbeds={props.globals.siteEmbeds || []}
      sectionProps={props}
    >
      <List
        blogPosts={blogPosts}
        containerStyle="container"
        locale={props.locale}
        wheel={wheel}
      />
    </ScrollSpy>
  )
}
