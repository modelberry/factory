import { jsx } from '@emotion/core'
import { PageSectionProps } from '../wheelroom/models/page-section/model-types'

export const getLandmark = (
  pageProps: PageSectionProps,
  sectionCount: number
): string => {
  const isNavigationSection =
    pageProps.__typename === 'ContentfulNavigationSection'
  const isPageSection = pageProps.__typename === 'ContentfulPageSection'
  const isHero = isPageSection && pageProps.variation === 'hero'
  if (pageProps.index <= 1 && (isHero || isNavigationSection)) {
    return 'header'
  }
  if (pageProps.index === sectionCount - 1 && isNavigationSection) {
    return 'footer'
  }

  return 'main'
}

export const Landmark = (props: {
  variation: string
  children: any
  key: number
}) => {
  const label = 'variation-' + props.variation || 'single'
  const dashedLabel = label.replace(' ', '-')
  const css = {
    label: dashedLabel,
    /** Render the `main` element consistently in IE. */
    display: 'block',
  }
  const attrs = {
    css,
  }
  return jsx('section', attrs, props.children)
}
