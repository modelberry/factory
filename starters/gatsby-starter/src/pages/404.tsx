import React from 'react'
import { PageProps } from 'gatsby'
import { Div, H1 } from '@wheelroom/any/elements'
import { globalReset } from '@wheelroom/any/resets/global-reset'

const ErrorPage = (props: PageProps) => {
  console.log('global resets', globalReset)
  console.log('props', props)
  return (
    <Div css={{ label: 'Div' }}>
      <H1 css={{ label: 'H1' }}>404</H1>
    </Div>
  )
}

export default ErrorPage
