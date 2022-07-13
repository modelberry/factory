import { CompareArraysResponse } from '../lib/compare-arrays'
import { ReportEntryState } from './report-entries'

export interface GetReportEntryState {
  compared: CompareArraysResponse
  item: string
}

export const getReportEntryState = ({
  compared,
  item,
}: GetReportEntryState): ReportEntryState => {
  let state: ReportEntryState = 'equal'

  if (compared.aOnly.includes(item)) state = 'add'
  if (compared.bOnly.includes(item)) state = 'remove'

  return state
}
