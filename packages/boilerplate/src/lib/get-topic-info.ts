import { TopicProps } from '../components/topic'

export interface TopicInfo {
  hasHeading: boolean
  hasAbstract: boolean
  hasAction: boolean
  hasImage: boolean
}

export const getTopicInfo = (topic: TopicProps): TopicInfo => {
  const info = {
    hasHeading: false,
    hasAbstract: false,
    hasAction: false,
    hasImage: false,
  } as TopicInfo

  if (topic.heading) {
    info.hasHeading = true
  }
  if (topic.abstract && topic.abstract.abstract) {
    info.hasAbstract = true
  }
  if (
    topic.actions &&
    Array.isArray(topic.actions) &&
    topic.actions.length > 0
  ) {
    info.hasAction = true
  }
  if (topic.media) {
    info.hasImage = true
  }

  return info
}
