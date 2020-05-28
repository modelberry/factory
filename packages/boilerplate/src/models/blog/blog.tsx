/**
 * Component interface only
 *
 * Component type: blog
 *
 */

import { TopicProps } from '../topic'
import { MediaObject } from '../../wheelroom/wheels/element/types/media'

export interface BlogProps {
  /** Gatsby fetched data */
  __typename: string
  heading: string
  title: string
  slug: string
  date: string
  text: {
    json: string
  }
  labels: TopicProps[]
  authors: TopicProps[]
  featured: TopicProps
  seoTitle: string
  seoDescription: string
  seoImage: MediaObject
  seoKeywords: string[]
}
