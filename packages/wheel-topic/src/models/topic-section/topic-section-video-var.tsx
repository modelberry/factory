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
import { TopicModel } from '../topic/model'
import { getSectionWheel, MultiParser } from '@wheelroom/core'
import { TopicSectionModel } from './model'
import { TopicSectionWrapper } from './topic-section-wrapper'

export const TopicSectionVideoVar = (props: TopicSectionModel) => {
  const sectionWheel = getSectionWheel({
    themeId: props.activeThemeId,
    wheelId: 'topicSection',
    sectionWheels: props.sectionWheels,
    variation: 'video',
  })

  if (!sectionWheel || !props.topics) {
    return null
  }
  const { wheel } = sectionWheel

  return (
    <TopicSectionWrapper containerStyle="container" wheel={wheel}>
      {props.topics.slice(0, 1).map((topic: TopicModel, index: number) => (
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