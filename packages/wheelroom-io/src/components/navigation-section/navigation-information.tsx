import { AnyProps, Div } from '@wheelroom/any/react'
import { NavigationSegment } from '../navigation-segment/navigation-segment'
import { ContentfulNavigationSection } from './contentful-navigation-section'

export interface NavigationInformation {
  contentfulNavigationSection?: ContentfulNavigationSection
}

type AnyDivProps = AnyProps['div']
export interface NavigationInformationProps extends AnyDivProps {
  model?: NavigationInformation
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const navigationInformationStyleFactory = (args: {
  variant?: any
  options?: any
}) => {
  return {}
}

export const NavigationInformation = ({
  model,
  ...props
}: NavigationInformationProps) => {
  const section = model?.contentfulNavigationSection
  if (!section?.informationCollection?.items?.length) return null
  const css = navigationInformationStyleFactory({})

  return (
    <Div css={css} {...props}>
      Navigation Information Hoi
      <NavigationSegment
        model={{
          contentfulNavigationSegment: section?.informationCollection?.items[0],
        }}
      />
    </Div>
  )
}
