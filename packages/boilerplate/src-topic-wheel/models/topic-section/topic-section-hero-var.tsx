/**
 * Component variation
 *
 * Component type: pageSection
 * Variation: Hero
 *
 */

import React from 'react'
import { getTopicOptions } from '../../lib/get-topic-options'
import { Topic } from '../topic/topic'
import { TopicModelProps } from '../topic/model-types'
import { getWheel, MultiParser } from '../../../src-core'
import { TopicSectionModelProps } from './model-types'
import { TopicSectionWrapper } from './topic-section-wrapper'

export const TopicSectionHeroVar = (props: TopicSectionModelProps) => {
  const wheel = getWheel({
    themeId: props.activeThemeId,
    wheelId: 'topicSection',
    sectionWheels: props.sectionWheels,
    variation: 'hero',
  })

  if (!wheel || !props.topics) {
    return null
  }

  const topicHeading = props.index <= 1 ? 'h1' : 'h2'
  return (
    <TopicSectionWrapper containerStyle="fluid" wheel={wheel}>
      {props.topics.slice(0, 1).map((topic: TopicModelProps, index: number) => (
        <Topic
          key={index}
          topic={topic}
          useAbstractParser={MultiParser}
          useHeadingElement={topicHeading}
          wheel={{ ...wheel, style: wheel.style.topic }}
          topicOptions={getTopicOptions(props.topicOptions || [])}
        />
      ))}
    </TopicSectionWrapper>
  )
}
