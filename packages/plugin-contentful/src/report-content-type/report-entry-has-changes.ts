import { ReportEntry } from './report-entries'

export interface ReportEntryHasChanges {
  reportEntry: ReportEntry
}

// Check the report for differences
export const reportEntryHasChanges = ({
  reportEntry,
}: ReportEntryHasChanges): boolean => {
  if (reportEntry.state !== 'equal') return true
  for (const subEntry of reportEntry.subEntries) {
    const subResult = reportEntryHasChanges({ reportEntry: subEntry })
    // If a differnce is found, break the loop and return, otherwise continue
    // with the rest of the tree
    if (subResult) return true
  }
  return false
}
