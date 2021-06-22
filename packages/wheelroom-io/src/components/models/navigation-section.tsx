import { AnyProps, Div } from '@wheelroom/any/react'
import { StyleFactory } from '../../lib/component-styles'
import { ContentfulNavigationSection } from './contentful-navigation-section'
import { NavigationFooter } from './navigation-footer'
import { NavigationHeader } from './navigation-header'
import { NavigationInformation } from './navigation-information'
import { NavigationLegal } from './navigation-legal'
import { NavigationSitemap } from './navigation-sitemap'

export interface NavigationSection {
  contentfulNavigationSection?: ContentfulNavigationSection
}

type AnyDivProps = AnyProps['div']
export interface NavigationSectionProps extends AnyDivProps {
  model?: NavigationSection
}

export const navigationSectionStyleFactory: StyleFactory = () => {
  return {}
}

export const NavigationSection = (props: NavigationSectionProps) => {
  const css = navigationSectionStyleFactory({})

  return (
    <Div css={css} {...props}>
      <NavigationHeader {...props} />
      <NavigationInformation {...props} />
      <NavigationSitemap {...props} />
      <NavigationFooter {...props} />
      <NavigationLegal {...props} />
    </Div>
  )
}
