import { reportEntryHasChanges } from './report-entry-has-changes'
import { ReportEntry } from './report-entries'

export interface ReportHasChanges {
  /** Array with report values */
  report: ReportEntry[]
}

export const reportHasChanges = ({ report }: ReportHasChanges) => {
  let hasChangedEntry = false
  for (const reportEntry of report) {
    if (reportEntryHasChanges({ reportEntry })) {
      hasChangedEntry = true
      break
    }
  }
  return hasChangedEntry
}
