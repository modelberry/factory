/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Td } from '../../elements/self'
import { Topic } from '../topic/topic'
import { TopicOptions } from '../../lib/get-topic-options'
import { TopicProps } from '../topic/model-types'
import { Wheel } from '../../types/wheel'
import { TableRowCellWheelStyle } from './table-row-cell-preset'

export interface TableRowCellWheel extends Wheel {
  style: TableRowCellWheelStyle
}

export interface TableRowCellProps {
  /** Styling wheel */
  wheel: TableRowCellWheel
  /** Topic props */
  topic: TopicProps
  /** Percentage */
  dataCellWidth: number
  /** Topic options */
  topicOptions: TopicOptions
}

export const TableRowCell = (props: TableRowCellProps) => {
  if (!props.topic) {
    return null
  }

  const dataCellStyle = props.wheel.style

  if (!(dataCellStyle.ncss.w || dataCellStyle.ncss.width)) {
    dataCellStyle.ncss.w = props.dataCellWidth
  }

  return (
    <Td wheel={{ ...props.wheel, style: dataCellStyle }}>
      <Topic
        topic={props.topic}
        topicOptions={props.topicOptions}
        useHeadingElement="p"
        wheel={{ ...props.wheel, style: props.wheel.style.topic }}
      />
    </Td>
  )
}