/**
 * Component variation
 *
 * Component type: topicSection
 * Variation: Video
 *
 */

import React from 'react'
import { getTopicOptions } from '../../lib/get-topic-options'
import { Topic } from '../topic/topic'
import { TopicModelProps } from '../topic/model-props'
import { getWheel, MultiParser } from '../../../src-core'
import { TopicSectionModelProps } from './model-props'
import { TopicSectionWrapper } from './topic-section-wrapper'

export const TopicSectionVideoVar = (props: TopicSectionModelProps) => {
  const wheel = getWheel({
    themeId: props.activeThemeId,
    wheelId: 'topicSection',
    sectionWheels: props.sectionWheels,
    variation: 'video',
  })

  if (!wheel || !props.topics) {
    return null
  }

  return (
    <TopicSectionWrapper containerStyle="container" wheel={wheel}>
      {props.topics.slice(0, 1).map((topic: TopicModelProps, index: number) => (
        <Topic
          key={index}
          topic={topic}
          useAbstractParser={MultiParser}
          wheel={{ ...wheel, style: wheel.style.topic }}
          topicOptions={getTopicOptions(props.topicOptions || [])}
        />
      ))}
    </TopicSectionWrapper>
  )
}
