import React from 'react'
import { getTopicInfo } from '../../lib/get-topic-info'
import { TopicOptions } from '../../lib/get-topic-options'
import {
  Action,
  BlockLevelElementName,
  Box,
  ParserFunction,
  Wheel,
} from '../../../src-core'
import { TopicBody } from './topic-body'
import { TopicModelProps } from './model-props'
import { TopicModelNcssTree } from './model-ncss-tree'

export interface TopicWheel extends Wheel {
  style: TopicModelNcssTree
}

export interface TopicProps {
  /** Full Topic is wrapped in a link and the inside link becomes a span */
  fullTopicAsLink?: boolean
  /** Accept max number of Actions, ignore all others */
  maxActions?: number
  /** The topic to render */
  topic?: TopicModelProps
  /** Topic render options */
  topicOptions: TopicOptions
  /** Defaults to p */
  useAbstractElement?: BlockLevelElementName
  /** Defaults to p */
  useAbstractParser?: ParserFunction
  /** Defaults to h3 */
  useHeadingElement?: BlockLevelElementName
  /** Defaults to h3 */
  useHeadingParser?: ParserFunction
  /** Styling wheel */
  wheel: TopicWheel
}

export const Topic = (props: TopicProps) => {
  if (!props.topic) {
    return null
  }
  const topicInfo = getTopicInfo(props.topic)
  const fullTopicAsLink =
    !props.topicOptions.hideAction &&
    topicInfo.hasAction &&
    props.fullTopicAsLink

  const action = props.topic.actions && props.topic.actions[0]
  let Element: any
  let elementProps
  if (fullTopicAsLink) {
    Element = Action
    elementProps = { ...action, icon: undefined }
  } else {
    Element = Box
    elementProps = { is: 'div' }
  }

  return (
    <Element
      {...elementProps}
      wheel={{ ...props.wheel, style: props.wheel.style }}
    >
      <TopicBody {...props} />
    </Element>
  )
}
