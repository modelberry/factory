/** @jsx jsx */
import { jsx } from '@emotion/core'
import { BlockLevelElementName, InlineElementName } from './types'
import { styledSystem } from '@wheelroom/styled-system'
import { Wheel, NcssProps } from '../types'

export interface AnyProps {
  /** Styling wheel */
  wheel: Wheel
  /** Render as another HTML element */
  is?: InlineElementName | BlockLevelElementName | undefined
  /** React children */
  children?: any
  /** Nested emotion css styling */
  ncss?: NcssProps
  /** Id attribute */
  id?: string | undefined
  /** Role attribute */
  role?: string | undefined
  /** Title attribute */
  title?: string | undefined
  /** Aria-label attribute */
  ariaLabel?: string | undefined
  /** Aria-modal attribute */
  ariaModal?: boolean
  /** Aria-hidden attribute */
  ariaHidden?: boolean | undefined
  /** Hidden attribute */
  hidden?: boolean | undefined
  /** TabIndex attribute */
  tabIndex?: number | undefined
  /** On click handler */
  onClick?: () => any
}

const getAttrs = (props: AnyProps) => {
  const attrs = {
    id: props.id,
    role: props.role,
    title: props.title,
    'aria-modal': props.ariaModal,
    'aria-label': props.ariaLabel,
    'aria-hidden': props.ariaHidden,
    hidden: props.hidden,
    'tab-index': props.tabIndex,
    onClick: props.onClick,
  }
  return attrs
}

export const Any = (props: AnyProps) => {
  const label = `any-is-${props.is}`
  const attrs: any = getAttrs(props)
  attrs.css = styledSystem(props.wheel.styledSystemConfig, props.wheel.theme, {
    ncss: {
      label,
      ...props.ncss,
    },
  })

  return jsx(props.is || 'div', attrs, props.children)
}