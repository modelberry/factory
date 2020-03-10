/**
 * Component interface only
 *
 * Component type: page
 *
 */

export interface PageProps {
  /** Gatsby fetched data */
  __typename: string
  title: string
  path: string
  navigationHeading: string
  sections: any
  seoTitle: string
  seoDescription: string
}
