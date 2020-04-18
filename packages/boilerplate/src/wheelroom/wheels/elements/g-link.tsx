/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Link } from 'gatsby'
import { useContext } from 'react'
import { AdminCoreContext } from '@wheelroom/admin-core'
import { getPreviewQueryString } from '@wheelroom/admin-page-preview'
import { gLinkReset } from './g-link-reset'
import { styledSystem } from '@wheelroom/styled-system'
import { mergeNcss } from '../../lib/merge-ncss'
import { ElementProps, getElementAttrs } from './element'

export interface GLinkProps extends ElementProps {
  /** URL attribute */
  to?: any
}

export const GLink = (props: GLinkProps) => {
  const { adminCoreState } = useContext(AdminCoreContext)
  const label = { ncss: { label: 'a-link' } }
  const attrs: any = getElementAttrs(props)
  attrs.to = props.to + getPreviewQueryString(adminCoreState)
  attrs.css = styledSystem(
    props.wheel.styledSystemConfig,
    props.wheel.theme,
    mergeNcss([
      label,
      gLinkReset,
      props.wheel.elementPresets.gLink,
      props.wheel.style,
      props,
    ])
  )

  return <Link {...attrs}>{props.children}</Link>
}
