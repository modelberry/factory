import { ContentfulNavigationSection } from '../navigation-section/contentful-navigation-section'
import { ContentfulTopicSection } from '../topic-section/contentful-topic-section'
import { TopicSection } from '../topic-section/topic-section'
import { NavigationSection } from '../navigation-section/navigation-section'

const sectionMap = {
  Contentful_TopicSection: TopicSection,
  Contentful_NavigationSection: NavigationSection,
}

type SectionType = keyof typeof sectionMap

export type Sections = {
  sections?: ContentfulTopicSection[] | ContentfulNavigationSection[]
}

export interface SectionsProps {
  model?: Sections
}

export const Sections = (props: SectionsProps) => {
  return (
    <>
      {props.model?.sections?.map((section: ContentfulTopicSection, index) => {
        const sectionType = section.__typename as SectionType
        const Section = sectionMap[sectionType]
        return (
          <Section
            key={'id-' + section.sys?.id + index}
            model={{ contentfulTopicSection: section }}
          />
        )
      })}
    </>
  )
}
