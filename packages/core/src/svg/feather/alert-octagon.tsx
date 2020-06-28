import React, { SVGProps } from 'react'
const componentId = 'svg-alert-octagon'
export const SvgAlertOctagon = (props: SVGProps<SVGSVGElement>) => {
  const strokeWidth = props.strokeWidth || 2
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="alert-octagon_svg__feather alert-octagon_svg__feather-alert-octagon"
      id={componentId}
      width="100%"
    >
      <path d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86L7.86 2zM12 8v4M12 16h.01" />
    </svg>
  )
}
