import React, { SVGProps } from 'react'
import { styledSystem } from '@wheelroom/styled-system'
import { Wheel } from '../../lib/wheel'
interface IconProps extends SVGProps<SVGSVGElement> {
  ncss: any
  wheel: Wheel
}
const componentId = 'svg-xcircle'
export const SvgXCircle = (props: IconProps) => {
  const strokeWidth = props.strokeWidth || 2
  const css = styledSystem(
    props.wheel.wrSystemConfig,
    props.wheel.wrSystemTheme,
    {
      ncss: props.ncss,
    }
  )
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="x-circle_svg__feather x-circle_svg__feather-x-circle"
      css={css}
      id={componentId}
      width="100%"
    >
      <circle cx={12} cy={12} r={10} />
      <path d="M15 9l-6 6M9 9l6 6" />
    </svg>
  )
}
