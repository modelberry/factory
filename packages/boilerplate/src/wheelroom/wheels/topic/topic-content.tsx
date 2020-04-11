import React from 'react'
import { Box } from '../elements/grid'
import { TopicProps } from '../../../models/topic'
import { TopicInfo } from '../../lib/get-topic-info'
import { PageSectionInfo } from '../../lib/get-page-section-info'
import { TopicContentText } from './topic-content-text'
import { TopicContentActions } from './topic-content-actions'
import { BlockLevelElementName } from '../elements/types'
import { ActionProps } from '../../../models/action/action'
import { ParserFunction } from '../../parsers/types'
import { TopicContentTreeStyle } from './topic-content-preset'

export interface TopicContentWrapperProps {
  topic: TopicProps
  /** Topic info object */
  topicInfo: TopicInfo
  /** Page section info */
  pageSectionInfo: PageSectionInfo

  /** Defaults to h3 */
  useHeadingElement?: BlockLevelElementName
  /** Defaults to p */
  useAbstractElement?: BlockLevelElementName
  /** Defaults to h3 */
  useHeadingParser?: ParserFunction
  /** Defaults to p */
  useAbstractParser?: ParserFunction

  /** Reverse image and content */
  reverse?: boolean
  /** Page section actions will override all topic actions */
  pageSectionActions?: ActionProps[]
  /** Full Topic is wrapped in a link and the inside link becomes a span */
  fullTopicAsLink?: boolean

  treeStyle?: TopicContentTreeStyle
}

export const TopicContent = (props: TopicContentWrapperProps) => {
  const topicInfo = props.topicInfo
  const pageSectionInfo = props.pageSectionInfo
  const topicOptions = pageSectionInfo.topicOptions
  const showAction = topicInfo.hasAction && !topicOptions.hideAction
  const treeStyle = props.treeStyle || {}
  const ncssStyle = (treeStyle && treeStyle.ncss) || {}
  ncssStyle.order = props.reverse ? -1 : null

  // console.log('ncssStyle', ncssStyle)

  return (
    <Box ncss={ncssStyle}>
      <TopicContentText
        pageSectionInfo={pageSectionInfo}
        treeStyle={treeStyle.text}
        topic={props.topic}
        topicInfo={topicInfo}
        useAbstractElement={props.useAbstractElement}
        useHeadingElement={props.useHeadingElement}
        useAbstractParser={props.useAbstractParser}
        useHeadingParser={props.useHeadingParser}
      />
      {showAction && (
        <TopicContentActions
          fullTopicAsLink={props.fullTopicAsLink}
          pageSectionActions={props.pageSectionActions}
          pageSectionInfo={pageSectionInfo}
          treeStyle={treeStyle.actions}
          topic={props.topic}
          topicInfo={topicInfo}
        />
      )}
    </Box>
  )
}
