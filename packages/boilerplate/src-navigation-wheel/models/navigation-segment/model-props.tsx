/**
 * Component
 *
 * Component type: navigationSegment
 *
 */
import { ActionModel } from '../../../src-core'

export interface NavigationSegmentModel {
  /** Gatsby fetched data */
  __typename: string
  heading?: string
  actions?: ActionModel[]
}
