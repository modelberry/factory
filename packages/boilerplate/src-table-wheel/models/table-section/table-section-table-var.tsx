/**
 * Component variation
 *
 * Component type: tableSection
 * Variation: Table
 *
 */

import React from 'react'
import { getWheel } from '../../../src-core'
import { Table } from './table'
import { TableSectionModelProps } from './model-props'
import { TableSectionWrapper } from './table-section-wrapper'

export const TableSectionTableVar = (props: TableSectionModelProps) => {
  const wheel = getWheel({
    themeId: props.activeThemeId,
    wheelId: 'tableSection',
    sectionWheels: props.sectionWheels,
    variation: 'table',
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
