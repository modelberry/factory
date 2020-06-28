/**
 * Component variation
 *
 * Component type: tableSection
 * Variation: Price
 *
 */

import React from 'react'
import { getWheel } from '../../../src-core'
import { Table } from './table'
import { TableSectionModelProps } from './model-props'
import { TableSectionWrapper } from './table-section-wrapper'

export const TableSectionPriceVar = (props: TableSectionModelProps) => {
  const wheel = getWheel({
    themeId: props.activeThemeId,
    wheelId: 'tableSection',
    sectionWheels: props.sectionWheels,
    variation: 'price',
  })

  if (!wheel || !props.tableRows) {
    return null
  }

  return (
    <TableSectionWrapper containerStyle="container" wheel={wheel}>
      <Table
        tableRows={props.tableRows}
        topicOptions={props.topicOptions || {}}
        wheel={{ ...wheel, style: wheel.style.table }}
      />
    </TableSectionWrapper>
  )
}
